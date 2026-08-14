# How to submit URLs to search engines

Tell search engines a page changed instead of waiting to be crawled. IndexNow
runs automatically after every production deploy; this covers running it by
hand, reading its output, and what to do on the Google side, which IndexNow does
not reach.

## What is automatic

`.github/workflows/indexnow.yml` fires on push to `main`, which is what deploys
to `dpdpact.net`. You do not need to do anything after a normal merge.

The workflow:

1. Reads the `data-dpl-id` Vercel stamps on the homepage response.
2. Polls every 15 seconds for up to 10 minutes until that id changes, which is
   the signal the new build is live.
3. Runs `node scripts/indexnow.mjs`.

Waiting is the point. IndexNow means "this URL changed, come look". Sending it
before the deploy points Bing at the old page, or at a URL that does not exist
yet. That is also why this is not a pre-push hook.

If the id never changes within 10 minutes the workflow logs a warning and
submits anyway. The workflow can start after Vercel has already finished, in
which case the id never changes from the first read. Submitting a live URL
slightly early is harmless; skipping the submission is not.

`concurrency: indexnow` with `cancel-in-progress: false` means two submissions
never overlap and one in flight is never cancelled. A half-sent batch is worse
than a late one.

## Who receives it

IndexNow reaches **Bing, Yandex and Seznam**. Google has not adopted it. The
Google side still needs a sitemap resubmission in Search Console and, for a
handful of pages, a manual request. Treat this as a complement to Search
Console, not a replacement.

## Submitting by hand

### Preview the payload

```bash
npm run indexnow -- --dry-run
```

```
key file  200 · body matches the key
sitemap   94 URLs, all on dpdpact.net

--dry-run, nothing sent. Payload:
{
  "host": "dpdpact.net",
  "key": "4e5e58f853434784a7cfdb317e42c8d6",
  "keyLocation": "https://dpdpact.net/4e5e58f853434784a7cfdb317e42c8d6.txt",
  "urlList": [
    "https://dpdpact.net/",
    "https://dpdpact.net/reader",
    "https://dpdpact.net/reader/full-text",
    "https://dpdpact.net/reader/section-1",
    "https://dpdpact.net/reader/section-2"
  ]
}
  … and 89 more URLs
```

Nothing is sent. Use this to confirm the URL count looks right after adding
pages.

### Submit

```bash
npm run indexnow
```

The script runs three checks before it sends anything:

1. Fetches the key file and confirms its body equals the key. Exits 1 if not.
2. Reads `https://dpdpact.net/sitemap.xml` and extracts every `<loc>`. Exits 1
   if the list is empty.
3. Rejects the whole batch if any URL is not on `dpdpact.net`.

The URL list comes from the live sitemap rather than a hardcoded array, so it
stays correct as pages are added. Note that it reads the **live** sitemap, not
your local build: submitting before the deploy is live submits the old list.

## Reading the response

| Status | Meaning | Action |
| --- | --- | --- |
| 200 | URLs submitted | None |
| 202 | Accepted, key validation pending | None. This is the normal first response |
| 400 | Bad request, invalid format | Check the payload with `--dry-run` |
| 403 | Key not valid for this host | The key file is missing or wrong. See below |
| 422 | URLs do not belong to the host, or the key does not match | A URL in the sitemap is off-host |
| 429 | Too many requests | Wait. Do not retry in a loop |

The script exits non-zero on any status other than 200 or 202.

## Key ownership

Ownership is proved by a file at the site root whose name is the key and whose
body is the key:

```
public/4e5e58f853434784a7cfdb317e42c8d6.txt
```

It ships with the site because it is in `public/`. If it is deleted, IndexNow
returns 403 and the script fails its first check with a clear message rather
than sending a batch that will be rejected.

To rotate the key, generate a new 32-character hex string, rename the file,
write the same value inside it, and update `KEY` in `scripts/indexnow.mjs`.

The endpoint path is `https://api.indexnow.org/IndexNow`. The casing follows the
published spec. The endpoint accepts lowercase too, but matching the
documentation removes a thing to wonder about later.

## The Google side

IndexNow does not reach Google. After a significant content change:

1. Open Search Console for `dpdpact.net`.
2. Sitemaps, resubmit `https://dpdpact.net/sitemap.xml`.
3. URL Inspection on the handful of pages that matter most, then
   "Request indexing".

Bing ownership is separately proved two ways, either of which is sufficient:
`public/BingSiteAuth.xml`, and the `msvalidate.01` meta tag in
`src/app/layout.tsx`. The meta tag travels with the app and survives a stray
deletion under `public/`.

## Troubleshooting

**`key file check failed: ... returned 404`**
`public/4e5e58f853434784a7cfdb317e42c8d6.txt` is missing from the deploy. Confirm
it exists in `public/` and that the deploy succeeded.

**`no URLs found in the sitemap`**
`https://dpdpact.net/sitemap.xml` returned something without `<loc>` elements,
usually because the site is mid-deploy or returned an error page. Retry after
the deploy settles.

**`refusing to submit: N URL(s) outside dpdpact.net`**
`src/app/sitemap.ts` is emitting an absolute URL on another host. Fix the
sitemap; do not bypass the check.

**The workflow ran but nothing was submitted**
Check the "Wait for the production deploy" step. If it warns that the deployment
id did not change, the submission still ran. If the job failed before it, the
script never executed and you can run `npm run indexnow` locally.

## Related

- `src/app/sitemap.ts` - the URL list this reads
- `src/app/robots.ts` - crawler rules
- `src/app/llms.txt/route.ts` - the answer-engine surface
- `README.md`, "SEO" and "AEO" - strategy and what is deliberately excluded
