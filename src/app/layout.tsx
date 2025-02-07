import type { Metadata } from 'next';
import { Poppins, Montserrat, Open_Sans, Fira_Code } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

import { ThemeProvider } from '@/components/theme/theme-provider';

import './globals.css';

const poppins = Poppins({
  // body and small texts
  subsets: ['latin'],
  weight: ['400', '600'], // Regular y Semi-Bold
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  // headings and titles
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const openSans = Open_Sans({
  // paragraphs and large texts
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-openSans',
});

const firaCode = Fira_Code({
  // badges and short texts
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-fira-code',
});

export const metadata: Metadata = {
  title: 'Ruli-AlSe - Personal Website',
  description: 'Personal website of Ruli AlSe, a software engineer and tech enthusiast.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${montserrat.variable} ${openSans.variable} ${firaCode.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
