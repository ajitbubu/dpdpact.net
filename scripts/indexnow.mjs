#!/usr/bin/env node
/**
 * Push every sitemap URL to IndexNow.
 *
 * IndexNow notifies Bing, Yandex and Seznam that URLs have changed, instead of
 * waiting to be crawled. Google has not adopted it, so this is a complement to
 * Search Console rather than a replacement — the Google side still needs a
 * sitemap resubmission and, for a handful of pages, a manual request.
 *
 * The URL list is read from the live sitemap rather than hard-coded, so this
 * stays correct as pages are added. Run it after a deploy:
 *
 *   node scripts/indexnow.mjs            # submit
 *   node scripts/indexnow.mjs --dry-run  # print what would be sent
 *
 * Key ownership is proved by a file at the site root whose name is the key and
 * whose body is the key. That file is in `public/`, so it ships with the site.
 */

const HOST = "dpdpact.net";
const KEY = "4e5e58f853434784a7cfdb317e42c8d6";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP = `https://${HOST}/sitemap.xml`;
// Path casing follows the published spec (`POST /IndexNow`). The endpoint
// accepts lowercase too — the first submission used it and returned 202 — but
// matching the documentation removes a thing to wonder about later.
const ENDPOINT = "https://api.indexnow.org/IndexNow";

const dryRun = process.argv.includes("--dry-run");

/** IndexNow's documented responses. Anything else is reported verbatim. */
const MEANING = {
  200: "OK — URLs submitted",
  202: "Accepted — URLs received, key validation pending",
  400: "Bad request — invalid format",
  403: "Forbidden — key not valid for this host",
  422: "Unprocessable — URLs do not belong to the host, or the key does not match",
  429: "Too many requests — slow down",
};

async function main() {
  // 1. prove the key file is reachable before asking anyone to check it
  const keyRes = await fetch(KEY_LOCATION);
  const keyBody = (await keyRes.text()).trim();
  if (!keyRes.ok || keyBody !== KEY) {
    console.error(
      `key file check failed: ${KEY_LOCATION} returned ${keyRes.status}, body ${JSON.stringify(keyBody.slice(0, 60))}`,
    );
    process.exit(1);
  }
  console.log(`key file  ${keyRes.status} · body matches the key`);

  // 2. take the URL list from the sitemap, so it cannot drift
  const xml = await (await fetch(SITEMAP)).text();
  const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  if (urlList.length === 0) {
    console.error("no URLs found in the sitemap");
    process.exit(1);
  }
  const foreign = urlList.filter((u) => !u.startsWith(`https://${HOST}/`) && u !== `https://${HOST}`);
  if (foreign.length) {
    console.error(`refusing to submit: ${foreign.length} URL(s) outside ${HOST}`);
    process.exit(1);
  }
  console.log(`sitemap   ${urlList.length} URLs, all on ${HOST}`);

  const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };

  if (dryRun) {
    console.log("\n--dry-run, nothing sent. Payload:");
    console.log(JSON.stringify({ ...payload, urlList: urlList.slice(0, 5) }, null, 2));
    console.log(`  … and ${urlList.length - 5} more URLs`);
    return;
  }

  // 3. submit
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  console.log(`\nPOST ${ENDPOINT}`);
  console.log(`  ${res.status} — ${MEANING[res.status] ?? "undocumented status"}`);
  if (text.trim()) console.log(`  body: ${text.slice(0, 300)}`);
  if (!res.ok && res.status !== 202) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
