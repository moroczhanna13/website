import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { meta, ui, type Lang, type Localized, type UiText } from '../content';

const STORAGE_KEY = 'mh-lang';

/** Saved choice first, then the browser's preferred languages, then English. */
function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'hu' || saved === 'en') return saved;
  } catch {
    /* storage unavailable (private mode etc.) */
  }
  const list = navigator.languages?.length ? navigator.languages : [navigator.language ?? ''];
  for (const code of list) {
    const c = code.toLowerCase();
    if (c.startsWith('hu')) return 'hu';
    if (c.startsWith('en')) return 'en';
  }
  return 'en';
}

interface LanguageContextValue {
  lang: Lang;
  /** UI strings for the current language. */
  t: UiText;
  /** Picks the current language from a `{ hu, en }` value. */
  tr: <T>(value: Localized<T>) => T;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLang = useCallback(() => setLang(lang === 'hu' ? 'en' : 'hu'), [lang, setLang]);

  // Keep <html lang>, the tab title and the meta description in sync.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = meta[lang].title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta[lang].description);
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, t: ui[lang], tr: (v) => v[lang], setLang, toggleLang }),
    [lang, setLang, toggleLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
