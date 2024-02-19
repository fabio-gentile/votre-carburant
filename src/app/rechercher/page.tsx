'use client';

import { redirect, useSearchParams } from 'next/navigation';
import { useStation } from '@/hooks/use-station';
import { useEffect, useState } from 'react';
import { CardStation } from '@/components/card-station';
import { TertiaryTitle } from '@/components/ui/title';

export default function Page() {
  const searchParams = useSearchParams();
  const [postalCode, setPostalCode] = useState(searchParams.get('cp') || '');
  const [fuelType, setFuelType] = useState(searchParams.get('fuel') || null);
  const [limit, setLimit] = useState(searchParams.get('limit') || '5');
  const [offset, setOffset] = useState(searchParams.get('offset') || '0');
  const { data, isLoading } = useStation(postalCode, fuelType, limit, offset);

  useEffect(() => {
    if (data?.error_code) redirect('/404');

    setPostalCode(searchParams.get('cp') || '');
    setFuelType(searchParams.get('fuel') || null);
    setLimit(searchParams.get('limit') || '5');
    setOffset(searchParams.get('offset') || '0');
  }, [data?.error_code, searchParams]);

  return (
    <>
      {isLoading && <h2>Loading ...</h2>}

      {!isLoading && data?.total_count === 0 ? (
        <p>0 Station trouvée. Essayez de changer la ville ou le carburant.</p>
      ) : (
        <>
          {data && <TertiaryTitle>{data?.total_count} Station recensées.</TertiaryTitle>}
          <CardStation stations={data?.results} />
        </>
      )}
    </>
  );
}
