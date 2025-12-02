import type { Metadata } from 'next';
import { Inter, Nunito } from 'next/font/google';
import '@/styles/site.scss';
import StaticSiteNavigation from '@/components/StaticSideNavigation';

const headingFont = Inter({
  variable: '--font-heading',
  subsets: ['latin'],
});

const bodyFont = Nunito({
  variable: '--font-body',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TJ Expense Tracker',
  description: 'Budgeting and tracking daily expenses',
  icons: '/favicon_01.png',
};

export default function RootLayout({
  children  
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <StaticSiteNavigation />
        <main className="main">            
          {children}
        </main>
      </body>
    </html>
  );
}
