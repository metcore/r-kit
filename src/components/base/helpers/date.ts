type Lang = 'id' | 'en';

type Option = {
  label: string;
  value: number;
};

const DAY_NAMES: Record<Lang, readonly string[]> = {
  id: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};

export const dayOptions = (lang: Lang = 'id'): Option[] => {
  return DAY_NAMES[lang].map((label, index) => ({
    label,
    value: index,
  }));
};
