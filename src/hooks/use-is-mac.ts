import { useEffect, useState } from 'react';

const MAC_PATTERN = /mac|iphone|ipad|ipod/i;

function detectMac(): boolean {
  if (typeof navigator === 'undefined') return false;

  const uaData = (
    navigator as Navigator & {
      userAgentData?: { platform?: string };
    }
  ).userAgentData;

  const platform =
    uaData?.platform ?? navigator.platform ?? navigator.userAgent;
  return MAC_PATTERN.test(platform);
}

/**
 * `true` jika perangkat memakai tombol Command, dipakai untuk memilih antara
 * simbol ⌘ dan teks "Ctrl". Selalu `false` pada render pertama (dan saat SSR)
 * supaya markup server dan klien tidak berbeda.
 */
export function useIsMac(): boolean {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(detectMac());
  }, []);

  return isMac;
}
