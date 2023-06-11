import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';
import Nav from './nav';

export const metadata = {
  title: 'Management Platform'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
