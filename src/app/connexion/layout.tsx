import { Metadata } from 'next';
import React from 'react';
import { PrimaryTitle } from '@/components/ui/title';

export const metadata: Metadata = {
  title: 'Se connecter',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={'w-84 mx-auto grid gap-4 sm:w-96'}>
      <PrimaryTitle>Se connecter en un clic</PrimaryTitle>
      {children}
    </div>
  );
}
