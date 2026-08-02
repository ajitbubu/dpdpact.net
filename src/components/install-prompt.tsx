"use client";

import * as React from "react";
import { Download, Share2, X } from "lucide-react";

import { useIsClient } from "@/lib/browser-store";

type InstallChoice = {
  outcome: "accepted" | "dismissed";
  platform: string;
};

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<InstallChoice>;
}

type NavigatorWithStandalone = Navigator & { standalone?: boolean };

function isIosDevice() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function isInstalled() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    (navigator as NavigatorWithStandalone).standalone === true
  );
}

/**
 * Browsers do not guarantee their own PWA install banner. This component
 * exposes Chromium's deferred native prompt and supplies the manual iOS path,
 * where `beforeinstallprompt` is not available.
 */
export function InstallPrompt() {
  const [promptEvent, setPromptEvent] =
    React.useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const isClient = useIsClient();
  const showIosInstructions =
    isClient && !installed && !isInstalled() && isIosDevice();

  React.useEffect(() => {
    if (isInstalled()) return;

    function onBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    }

    function onInstalled() {
      setInstalled(true);
      setPromptEvent(null);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (!promptEvent) return;
    await promptEvent.prompt();
    await promptEvent.userChoice;
    // A BeforeInstallPromptEvent can only be used once. The browser will emit
    // another event later if installation remains available.
    setPromptEvent(null);
  }

  const visible = !dismissed && (promptEvent !== null || showIosInstructions);
  if (!visible) return null;

  return (
    <aside
      aria-label="Install DPDP Academy"
      aria-live="polite"
      className="no-print fixed inset-x-[var(--space-4)] bottom-[var(--space-4)] z-[70] mx-auto flex max-w-[620px] items-start gap-[14px] rounded-md border border-border bg-surface p-[16px] shadow-[var(--shadow-raised)]"
    >
      <span className="mt-[2px] inline-flex size-[38px] shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary-text">
        {showIosInstructions ? (
          <Share2 aria-hidden="true" className="size-[19px]" />
        ) : (
          <Download aria-hidden="true" className="size-[19px]" />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <strong className="block font-display text-[18px] font-semibold leading-[1.25] text-text">
          Add DPDP Academy to your home screen
        </strong>
        <span className="mt-[4px] block text-[13px] leading-[1.55] text-text-secondary">
          {showIosInstructions
            ? "In Safari, tap Share, then choose Add to Home Screen."
            : "Install the app for a focused, full-screen reading experience."}
        </span>
        {promptEvent ? (
          <button
            type="button"
            onClick={install}
            className="mt-[11px] inline-flex min-h-[40px] cursor-pointer items-center justify-center rounded-sm border border-text bg-text px-[16px] font-sans text-[14px] font-semibold text-canvas hover:bg-text-secondary"
          >
            Install app
          </button>
        ) : null}
      </span>

      <button
        type="button"
        aria-label="Dismiss install prompt"
        onClick={() => setDismissed(true)}
        className="inline-flex size-[38px] shrink-0 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent text-text-muted hover:bg-[var(--bg-sunken)] hover:text-text"
      >
        <X aria-hidden="true" className="size-[18px]" />
      </button>
    </aside>
  );
}
