import type { Metadata } from 'next';
import '@/assets/globals.css';
import localFont from 'next/font/local';
import { NavigationMenu } from '@/components/navigation-menu';
import { Footer } from '@/components/footer';
import { Wrapper } from '@/components/wrapper';
import React from 'react';
import { NextAuthProvider, TanstackQueryProvider } from '@/app/provider';

const marianne = localFont({
  src: [
    {
      path: '../assets/fonts/Marianne-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Marianne-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Marianne-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: 'votre-carburant.fr',
    template: '%s | votre-carburant.fr',
  },
  description: 'Site web recensant les stations-service en France.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr'>
      <body className={`${marianne.className} mx-auto flex min-h-[100dvh] flex-col justify-center`}>
        <NextAuthProvider>
          <TanstackQueryProvider>
            <NavigationMenu />
            <main className='grow bg-white-bg py-8 md:py-12'>
              <Wrapper>{children}</Wrapper>
            </main>
            <Footer />
          </TanstackQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
