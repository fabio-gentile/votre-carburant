import React from 'react';
import { PrimaryTitle } from '@/components/ui/title';
import { SearchStation } from '@/components/search-station';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col justify-center gap-8 sm:gap-12 lg:gap-16'>
      <PrimaryTitle>Le carburant le moins cher, le plus près de chez vous.</PrimaryTitle>
      <SearchStation />
      {children}
    </div>
  );
}
