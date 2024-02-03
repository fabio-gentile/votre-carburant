import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Wrapper from '@/components/Wrapper';
import React from 'react';
import { NextAuthProvider } from '@/app/provider';

const marianne = localFont({
  src: [
    {
      path: '../fonts/Marianne-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Marianne-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Marianne-Bold.woff2',
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
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${marianne.className} mx-auto flex min-h-[100vh] flex-col justify-center`}>
        <NextAuthProvider>
          <NavBar />
          <main className='grow bg-white-bg '>
            <Wrapper>{children}</Wrapper>
          </main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
