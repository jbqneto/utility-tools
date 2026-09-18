'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { defaultLocale, isLocale, localeCookieName, type Locale } from '@/i18n/config';
import { getMessages, type Messages } from '@/i18n/messages';

type LocaleContextValue = {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;

  const localStorageLocale = window.localStorage.getItem(localeCookieName);
  if (isLocale(localStorageLocale)) return localStorageLocale;

  const cookie = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${localeCookieName}=`))
    ?.split('=')[1];

  return isLocale(cookie) ? cookie : defaultLocale;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    setLocaleState(readStoredLocale());
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(localeCookieName, nextLocale);
    document.cookie = `${localeCookieName}=${encodeURIComponent(nextLocale)}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
  };

  const value = useMemo(
    () => ({ locale, messages: getMessages(locale), setLocale }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used inside LocaleProvider');
  return context;
}
