export const locales = ['pt-BR', 'pt-PT', 'en-US'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pt-BR';
export const localeCookieName = 'tdl-locale';

export function isLocale(value: string | null | undefined): value is Locale {
  return value != null && locales.includes(value as Locale);
}
