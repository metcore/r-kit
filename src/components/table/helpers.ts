export function generatePages(current: number, total: number) {
  if (total <= 6) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  // 🔹 Awal: tampilkan 1 2 3 ... last
  if (current <= 2) {
    pages.push(1, 2, 3);
    pages.push("...");
    pages.push(total);
    return pages;
  }

  // 🔹 Akhir: tampilkan 1 ... last-3 last-2 last-1 last
  if (current >= total - 2) {
    pages.push(1);
    pages.push("...");
    pages.push(total - 3, total - 2, total - 1, total);
    return pages;
  }

  // 🔹 Tengah: 1 ... prev current next ... last
  pages.push(1);
  pages.push("...");
  pages.push(current, current + 1);
  pages.push("...");
  pages.push(total);

  return pages;
}
