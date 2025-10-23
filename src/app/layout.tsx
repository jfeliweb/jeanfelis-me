import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const inter = Geist({
  variable: '--font-inter',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Jean Felisme – Software Developer',
  description:
    'Software Developer specializing in React, Next.js, and TypeScript. Portfolio, experience, projects, and blog.',
  openGraph: {
    type: 'website',
    title: 'Jean Felisme – Software Developer',
    description:
      'React/Next.js/TypeScript developer. Explore experience, projects, and articles by Jean Felisme.',
    url: '/',
    siteName: 'jeanfelis.me',
  },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`} suppressHydrationWarning={true}>
        <a className="sr-only focus:not-sr-only" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
