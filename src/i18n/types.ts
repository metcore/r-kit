import type { defaultNamespace, resources } from './index';

/**
 * Membuat key terjemahan ikut diperiksa TypeScript, sehingga key yang salah
 * ketik atau namespace yang keliru langsung ketahuan saat build.
 */
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNamespace;
    resources: (typeof resources)['id'];
  }
}
