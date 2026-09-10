"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallAppButton({
  variant = "icon",
}: {
  /** "icon" = compact icon-only button for the navbar. "row" = full-width row for the mobile menu list. "banner" = standalone card for page content. */
  variant?: "icon" | "row" | "banner";
}) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showIOSHint, setShowIOSHint] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) return; // already installed, nothing to show

    const iOSDevice = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    if (iOSDevice) {
      setIsIOS(true);
      setVisible(true);
    }

    function handleBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    }

    function handleAppInstalled() {
      setVisible(false);
      setDeferredPrompt(null);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  if (!visible) return null;

  async function handleClick() {
    if (isIOS) {
      setShowIOSHint((s) => !s);
      return;
    }
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setVisible(false);
  }

  const icon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (variant === "banner") {
    return (
      <div className="rounded-lg bg-navy text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 shrink-0">
            {icon}
          </span>
          <div>
            <p className="font-semibold">Install the Maverick Minds app</p>
            <p className="text-sm text-gray-300">
              Add it to your home screen for quick, app-like access.
            </p>
          </div>
        </div>
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={handleClick}
            className="px-5 py-2.5 rounded-md bg-white text-navy font-semibold text-sm hover:bg-gray-100 transition"
          >
            Install App
          </button>
          {showIOSHint && (
            <div className="absolute right-0 top-full mt-2 w-56 px-3 py-2 rounded bg-white text-navy text-xs shadow-lg z-50">
              Tap the Share icon in Safari, then choose &quot;Add to Home Screen&quot;.
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === "row") {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={handleClick}
          className="w-full flex items-center gap-2 px-2 py-2 rounded hover:bg-white/10 text-left"
        >
          {icon}
          Install App
        </button>
        {showIOSHint && (
          <div className="mx-2 mb-2 px-3 py-2 rounded bg-white/10 text-xs text-gray-200">
            Tap the Share icon in Safari, then choose &quot;Add to Home Screen&quot;.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        aria-label="Install app"
        title="Install app"
        className="p-2 rounded hover:bg-white/10 transition"
      >
        {icon}
      </button>
      {showIOSHint && (
        <div className="absolute right-0 top-full mt-2 w-56 px-3 py-2 rounded bg-navy border border-white/10 text-xs text-gray-200 shadow-lg z-50">
          Tap the Share icon in Safari, then choose &quot;Add to Home Screen&quot;.
        </div>
      )}
    </div>
  );
}
