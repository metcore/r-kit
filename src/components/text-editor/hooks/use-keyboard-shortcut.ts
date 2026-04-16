import { useEffect } from 'react';

type ShortcutOptions = {
  key: string;
  withMainModifier?: boolean;
  withShift?: boolean;
  withAlt?: boolean;
  preventDefault?: boolean;
  disabled?: boolean;
  callback: () => void;
};

function isMac() {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform);
}

function isTypingElement(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
}

export function useKeyboardShortcut({
  key,
  withMainModifier = true,
  withShift = false,
  withAlt = false,
  preventDefault = true,
  disabled = false,
  callback,
}: ShortcutOptions) {
  useEffect(() => {
    if (disabled) return;

    const handler = (e: KeyboardEvent) => {
      if (isTypingElement(e.target)) return;

      const mainModifier = isMac() ? e.metaKey : e.ctrlKey;

      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        mainModifier === withMainModifier &&
        e.shiftKey === withShift &&
        e.altKey === withAlt
      ) {
        if (preventDefault) e.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [
    key,
    withMainModifier,
    withShift,
    withAlt,
    preventDefault,
    disabled,
    callback,
  ]);
}
