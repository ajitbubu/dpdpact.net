"use strict";

(() => {
  function addCredit(root) {
    const modal = root.querySelector(".cc-modal");
    if (!modal || modal.querySelector(".cc-powered")) return;

    const credit = document.createElement("div");
    credit.className = "cc-powered";
    credit.textContent = "Powered by Faceoff.World";
    credit.style.cssText =
      "margin-top:14px;text-align:center;color:var(--cc-muted);font-size:12px;line-height:1.5";
    modal.appendChild(credit);
  }

  function start() {
    const host = document.querySelector("[data-cookie-consent-root]");
    const root = host?.shadowRoot;
    if (!root) return;

    addCredit(root);
    new MutationObserver(() => addCredit(root)).observe(root, {
      childList: true,
      subtree: true,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
