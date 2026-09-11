import { useEffect, useState } from 'react';
import { PACKAGE_NAME } from '../data/site';

const REGISTRY_URL = `https://registry.npmjs.org/${encodeURIComponent(
  PACKAGE_NAME
)}/latest`;

const CACHE_KEY = `r-kit:latest-version:${PACKAGE_NAME}`;

function readCache(): string | null {
  try {
    return sessionStorage.getItem(CACHE_KEY);
  } catch {
    return null;
  }
}

function writeCache(version: string): void {
  try {
    sessionStorage.setItem(CACHE_KEY, version);
  } catch {
    /* sessionStorage tidak tersedia — abaikan, versi tetap tampil */
  }
}

/**
 * Mengambil versi terbaru @herca/r-kit langsung dari registry npm supaya tidak
 * perlu diperbarui manual setiap rilis. Mengembalikan null selama request
 * berjalan atau jika registry tidak bisa dihubungi, sehingga pemanggil bisa
 * memilih untuk tidak menampilkan apa pun alih-alih menampilkan versi yang salah.
 */
export function useLatestVersion(): string | null {
  const [version, setVersion] = useState<string | null>(readCache);

  useEffect(() => {
    const controller = new AbortController();

    fetch(REGISTRY_URL, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { version?: string } | null) => {
        if (typeof data?.version !== 'string') return;

        writeCache(data.version);
        setVersion(data.version);
      })
      .catch(() => {
        /* offline atau registry down — biarkan versi cache/null yang tampil */
      });

    return () => controller.abort();
  }, []);

  return version;
}
