import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { LocaleProvider } from '@/components/locale-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://thedevlab.site'),
  title: {
    default: 'Gerador de QR Code Grátis | The Dev Lab',
    template: '%s | The Dev Lab',
  },
  description:
    'Crie QR Codes grátis para links, WhatsApp, Wi-Fi e textos. Gere e baixe seu QR Code em PNG ou SVG.',
  alternates: {
    canonical: '/qr-code',
  },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Gerador de QR Code Grátis',
    description:
      'Crie e baixe QR Codes para links, WhatsApp, Wi-Fi e textos em segundos.',
    url: 'https://thedevlab.site/qr-code',
    siteName: 'The Dev Lab',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gerador de QR Code Grátis',
    description:
      'Crie e baixe QR Codes para links, WhatsApp, Wi-Fi e textos em segundos.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <LocaleProvider>{children}</LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
