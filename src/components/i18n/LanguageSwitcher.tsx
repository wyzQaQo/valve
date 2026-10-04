'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { Globe, CaretDown } from '@phosphor-icons/react';

const LOCALE_LABELS: Record<string, string> = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  ar: 'العربية',
  pt: 'Português',
  fr: 'Français',
  de: 'Deutsch',
  hi: 'हिन्दी',
};

const LOCALE_FLAGS: Record<string, string> = {
  en: '🇺🇸',
  zh: '🇨🇳',
  es: '🇪🇸',
  ar: '🇸🇦',
  pt: '🇧🇷',
  fr: '🇫🇷',
  de: '🇩🇪',
  hi: '🇮🇳',
};

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split('/')[1] || 'en';

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLocale(locale: string) {
    setOpen(false);
    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/');
    router.push(newPath);
  }

  return (
    <div ref={ref} className="fixed bottom-24 right-6 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)]/40 transition-all"
        aria-label="Switch language"
      >
        <Globe size={16} />
        <span>{LOCALE_FLAGS[currentLocale]} {LOCALE_LABELS[currentLocale]}</span>
        <CaretDown size={12} className={open ? 'rotate-180' : ''} />
      </button>

      {open && (
        <div className="absolute bottom-full right-0 mb-2 w-48 max-h-72 overflow-y-auto rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl shadow-black/50">
          {routing.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-[var(--accent)]/10 ${
                locale === currentLocale
                  ? 'text-[var(--accent)] bg-[var(--accent)]/5'
                  : 'text-[var(--text-secondary)]'
              }`}
            >
              <span className="text-base">{LOCALE_FLAGS[locale]}</span>
              <span>{LOCALE_LABELS[locale]}</span>
              {locale === currentLocale && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
