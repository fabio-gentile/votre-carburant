'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { useCheapest } from '@/hooks/use-cheapest';
import { useRouter, useSearchParams } from 'next/navigation';
import { CardStation, CardStationSkeleton } from '@/components/card-station';
import { TertiaryTitle } from '@/components/ui/title';
import { Pagination } from '@/components/ui/pagination';

export default function Page() {
  const fuels = [
    { value: 'gazole', name: 'Gasoil' },
    { value: 'sp98', name: 'Sans plomb 98' },
    { value: 'e10', name: 'Essence 10' },
    { value: 'e85', name: 'Essence 85' },
    { value: 'sp95', name: 'Sans plomb 95' },
    { value: 'gplc', name: 'Gaz de pétrole liquéfié' },
  ];
  const searchParams = useSearchParams();
  const router = useRouter();
  const [fuelValue, setFuelValue] = useState(searchParams.get('fuel') || 'gazole');
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1);
  const LIMIT = 5;
  const offset = useRef(+currentPage * LIMIT - LIMIT);
  const { data, isLoading } = useCheapest(fuelValue, LIMIT, offset.current);
  let lastFuel = searchParams.get('fuel') || 'gazole';

  const handleButtonIsActive = (value: string) => {
    setFuelValue(value);
  };

  useEffect(() => {
    onPageChange(+currentPage);
  }, [fuelValue, currentPage]);

  const onPageChange = (page: number) => {
    if (lastFuel !== fuelValue) {
      setCurrentPage(1);
      offset.current = 0;
      lastFuel = fuelValue;
      return router.push(`/meilleurs-prix?fuel=${fuelValue}&page=${currentPage}`);
    }

    setCurrentPage(page < 1 ? 1 : page);
    offset.current = page * LIMIT - LIMIT;

    router.push(`/meilleurs-prix?fuel=${fuelValue}&page=${currentPage}`);
  };

  return (
    <>
      <div className='flex flex-wrap gap-3 sm:gap-4'>
        {fuels.map((fuel) => (
          <Button
            onClick={() => handleButtonIsActive(fuel.value)}
            variant={fuel.value === fuelValue ? 'default' : 'secondary'}
            key={fuel.value}
          >
            {fuel.name}
          </Button>
        ))}
      </div>
      {isLoading && <CardStationSkeleton count={5} />}
      {!isLoading && data?.total_count === 0 ? (
        <p>0 Station trouvée. Essayez de changer le carburant.</p>
      ) : (
        <>
          {data && data?.results.length > 0 && (
            <TertiaryTitle>{data?.total_count} Station recensées ces 3 derniers jours.</TertiaryTitle>
          )}
          <CardStation stations={data?.results} />
          {data && !data?.results.length && <p>Erreur lors du chargement</p>}
          {!isLoading && !!data?.results.length && (
            <Pagination
              currentPage={+currentPage}
              itemsPerPage={LIMIT}
              range={3}
              totalCount={data?.total_count || 0}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </>
  );
}
