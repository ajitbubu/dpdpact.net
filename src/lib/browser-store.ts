"use client";

import * as React from "react";

/**
 * A tiny `localStorage` store exposed through `useSyncExternalStore`.
 *
 * The pages here keep their credential, booking and reading progress in the
 * browser. Reading that in an effect would mean a setState-on-mount cascade
 * and would not notice writes made by another page or tab; subscribing to the
 * store instead gives a correct server snapshot (`null`) plus live updates.
 */

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // `storage` only fires for other tabs; `emit()` covers same-tab writes.
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getRaw(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStored(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
  emit();
}

export function removeStored(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* storage unavailable */
  }
  emit();
}

/** The parsed JSON value at `key`, or `null` on the server and when unset. */
export function useStored<T>(key: string): T | null {
  const raw = React.useSyncExternalStore(
    subscribe,
    () => getRaw(key),
    () => null,
  );

  return React.useMemo(() => {
    if (raw === null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }, [raw]);
}

const noopSubscribe = () => () => {};

/** `false` during SSR and the first render, `true` once hydrated. */
export function useIsClient(): boolean {
  return React.useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
