import type { Metadata } from 'next';
import type { Group } from '@/types/groups';
import type { Transaction } from '@/types/transactions';
import { Inter, Nunito } from 'next/font/google';
import '@/styles/site.scss';
import StaticSiteNavigation from '@/components/StaticSideNavigation';
import { TransactionsProvider } from "@/context/TransactionsContext";

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

export default async function RootLayout({
  children  
}: Readonly<{
  children: React.ReactNode
}>) {
  const [groupsRes, transactionsRes] = await Promise.all([
    fetch('http://localhost:3000/api/groups', { cache: 'no-store' }),
    fetch('http://localhost:3000/api/transactions', { cache: 'no-store' })
  ]);

  const groupData: Group[] = (await groupsRes.json()).data.groups;
  const transactions: Transaction[] = (await transactionsRes.json()).data.transactions;

  const sortedTransactions = transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());  

  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <StaticSiteNavigation />
        <TransactionsProvider groupData={groupData} initialTransactions={sortedTransactions}>
          <main className="main">            
            {children}
          </main>
        </TransactionsProvider>
      </body>
    </html>
  );
}
