import type { ReactNode } from 'react';

/**
 * Grup tombol toolbar. Memakai `display: contents` supaya tiap tombol
 * jadi item langsung di baris toolbar dan bisa turun baris satu per satu,
 * bukan satu grup utuh.
 *
 * Pemisah di awal grup diberi `data-edge` oleh TextEditor: garisnya cuma
 * tampil kalau grup sebelum dan sesudahnya ada di baris yang sama.
 */
export default function ToolbarGroup({ children }: { children: ReactNode }) {
  return (
    <div role="group" className="contents">
      <span
        aria-hidden
        data-toolbar-gap
        className="mx-1 -my-1.5 w-px shrink-0 self-stretch bg-gray-300 data-[edge=true]:invisible"
      />
      {children}
    </div>
  );
}
