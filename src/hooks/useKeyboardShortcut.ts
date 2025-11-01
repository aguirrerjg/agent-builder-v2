"use client";

import { useEffect } from "react";

/**
 * Hook para detectar combinaciones de teclas (ej: ⌘K, Ctrl+K)
 */
export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: { meta?: boolean; ctrl?: boolean } = {}
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const metaKey = options.meta !== false; // Por defecto true
      const ctrlKey = options.ctrl !== false; // Por defecto true

      // En Mac usa Command (metaKey), en Windows/Linux usa Ctrl
      const correctModifier = isMac 
        ? (metaKey && e.metaKey) 
        : (ctrlKey && e.ctrlKey);

      if (correctModifier && e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, callback, options]);
}

