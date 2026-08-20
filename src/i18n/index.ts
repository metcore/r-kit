import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import enLanding from './locales/en/landing.json';
import idCommon from './locales/id/common.json';
import idLanding from './locales/id/landing.json';

export const supportedLanguages = ['id', 'en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const defaultNamespace = 'common';

/**
 * Namespace dipisah per area supaya /docs dan /playground tinggal menambah
 * namespace sendiri tanpa mengubah yang sudah ada.
 */
export const resources = {
  id: { common: idCommon, landing: idLanding },
  en: { common: enCommon, landing: enLanding },
} as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'id',
    supportedLngs: supportedLanguages,
    defaultNS: defaultNamespace,
    ns: ['common', 'landing'],
    detection: {
      // Hanya pilihan eksplisit yang menimpa default; bahasa browser sengaja
      // tidak dipakai supaya halaman selalu terbuka dalam Bahasa Indonesia.
      order: ['localStorage'],
      lookupLocalStorage: 'r-kit:lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
