import '../styles/global.css';

import type { Metadata } from 'next';

import { PremiumCinematicBackground } from './components/PremiumCinematicBackground';

export const metadata: Metadata = {
  title: 'Jean Felisme - Full-Stack Engineer & Creator',
  description:
    'Full-stack engineer, creator, and founder of jFeliWeb. Building AI tools, indie web apps, and digital products from South Florida.',
  keywords: [
    'Jean Felisme',
    'Full-Stack Engineer',
    'South Florida',
    'jFeliWeb',
    'Creator',
  ],
  authors: [{ name: 'Jean Felisme' }],
  openGraph: {
    title: 'Jean Felisme - Full-Stack Engineer & Creator',
    description:
      'Full-stack engineer, creator, and founder of jFeliWeb. Building AI tools, indie web apps, and digital products from South Florida.',
    type: 'website',
    url: 'https://jeanfelis.me',
    siteName: 'Jean Felisme',
  },
  twitter: {
    card: 'summary',
    title: 'Jean Felisme - Full-Stack Engineer & Creator',
    description:
      'Full-stack engineer, creator, and founder of jFeliWeb. Building AI tools, indie web apps, and digital products from South Florida.',
    creator: '@jfeliweb',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-offWhite text-slate-900 antialiased dark:bg-[#0B0E12] dark:text-[#F2F5F8]">
        <PremiumCinematicBackground />

        <main className="flex flex-1 flex-col">{children}</main>

        <footer className="mt-auto py-4 text-center text-sm text-slate-500 dark:bg-[#0B0E12] dark:text-[#8A94A0]">
          Built with purpose in South Florida.
          <br />© 2025 Jean Felisme
        </footer>
      </body>
    </html>
  );
}
