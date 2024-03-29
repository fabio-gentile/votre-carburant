import React from 'react';
import { PrimaryTitle } from '@/components/ui/title';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meilleurs prix',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col justify-center gap-8 sm:gap-12 lg:gap-16'>
      <PrimaryTitle>Les meilleurs prix de l’hexagone.</PrimaryTitle>
      {children}
    </div>
  );
}
