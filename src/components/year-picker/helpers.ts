/**
 * Menghasilkan array tahun dalam format label/value untuk dropdown.
 * @param startYear Tahun awal (misal: 2020)
 * @param endYear Tahun akhir (misal: 2030)
 * @param pageIndex Indeks halaman
 * @param pageSize Jumlah item per halaman
 * @returns Array objek { label, value }
 */
export function generateYearOptions(
  startYear: number,
  endYear: number,
  pageIndex: number,
  pageSize: number
): { label: string; value: string }[] {
  const allYears = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );
  const paginatedYears = allYears.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize
  );
  return paginatedYears.map((year) => ({
    label: year.toString(),
    value: year.toString(),
  }));
}
