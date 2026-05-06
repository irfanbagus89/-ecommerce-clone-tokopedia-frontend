"use client";

import { useEffect, useState } from "react";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setVisible(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setVisible(false);
    setDeferredPrompt(null);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex items-center gap-3 animate-in slide-in-from-bottom-4">
      <div className="w-12 h-12 bg-[#03AC0E] rounded-xl flex items-center justify-center shrink-0">
        <span className="text-white font-bold text-xl">T</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 leading-tight">
          Pasang Tokopedia Clone
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          Akses lebih cepat dari layar utama
        </p>
      </div>
      <div className="flex flex-col gap-1.5 shrink-0">
        <button
          onClick={handleInstall}
          className="text-xs font-semibold text-white bg-[#03AC0E] hover:bg-[#028a0b] px-3 py-1.5 rounded-lg transition-colors"
        >
          Pasang
        </button>
        <button
          onClick={handleDismiss}
          className="text-xs font-medium text-gray-500 hover:text-gray-700 text-center"
        >
          Nanti
        </button>
      </div>
    </div>
  );
}
