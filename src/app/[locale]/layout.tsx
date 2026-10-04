import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return {
    metadataBase: new URL('https://valvemaster.com'),
    title: {
      default: t('defaultTitle'),
      template: `%s | ValveMaster`,
    },
    description: t('defaultDesc'),
    keywords: [
      'industrial valve manufacturer',
      'ball valve supplier',
      'gate valve',
      'butterfly valve',
      'pneumatic valve',
      'API 6D valve',
      'stainless steel valve',
      'flanged valve PN16',
    ],
    openGraph: {
      type: 'website',
      locale,
      siteName: 'ValveMaster',
      images: ['/images/og-default.jpg'],
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`]),
      ),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className="dark">
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="grain-overlay" aria-hidden="true" />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton phone="+8613800000000" />
          <LanguageSwitcher />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
