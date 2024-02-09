'use client';

import { useSearchParams } from 'next/navigation';
import { SearchStation } from '@/components/search-station';
import { useStation } from '@/hooks/use-station';
import { useEffect } from 'react';

export default function Rechercher() {
  const searchParams = useSearchParams();

  const where = searchParams.get('where')?.replace('=', '%3D') || '';
  const limit = searchParams.get('limit') || '20';
  const { data, isLoading } = useStation(where, limit);
  useEffect(() => {
    console.log('data ', data);
  }, [data]);
  return (
    <main className='flex flex-col justify-center gap-8 sm:gap-12 lg:gap-16'>
      <h1 className='primary-title text-center'>Le carburant le moins cher, le plus près de chez vous.</h1>
      <SearchStation />

      {isLoading && <h2>Loading ...</h2>}

      {!isLoading && data?.results.map((station) => <h2 key={station.id}>{station.adresse}</h2>)}
    </main>
  );
}
