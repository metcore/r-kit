/**
 * Menghasilkan array bulan dalam format label/value untuk dropdown.
 * @returns Array objek { label, value } dengan bulan 0–11
 */
export const generateMonthOptions = (
  lang: 'en' | 'id' = 'id'
): { label: string; value: number }[] => {
  const monthNamesId = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des',
  ] as const;

  const monthNamesEn = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ] as const;

  const monthNames = lang === 'en' ? monthNamesEn : monthNamesId;

  return monthNames.map((name, index) => ({
    label: name,
    value: index,
  }));
};
