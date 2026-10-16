"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "agenq_sdk_enabled";
const EVENT_NAME = "agenq-toggle-changed";
const DEFAULT_ENABLED = true;

function readEnabled(): boolean {
  if (typeof window === "undefined") return DEFAULT_ENABLED;
  try {
    const savedValue = localStorage.getItem(STORAGE_KEY);
    return savedValue === null ? DEFAULT_ENABLED : savedValue === "true";
  } catch {
    return DEFAULT_ENABLED;
  }
}

export function useAgenQEnabled() {
  const [enabled, setEnabledState] = useState(DEFAULT_ENABLED);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setEnabledState(readEnabled());
    setMounted(true);

    const handler = () => setEnabledState(readEnabled());
    window.addEventListener(EVENT_NAME, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT_NAME, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const setEnabled = useCallback((value: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch {}
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
    setEnabledState(value);
  }, []);

  return { enabled, setEnabled, mounted };
}

export function getAgenQEnabled(): boolean {
  return readEnabled();
}
