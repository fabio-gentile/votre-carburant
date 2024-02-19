'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useCheapest } from '@/hooks/use-cheapest';
import { useRouter, useSearchParams } from 'next/navigation';
import { CardStation } from '@/components/card-station';
import { TertiaryTitle } from '@/components/ui/title';

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
  const [fuelValue, setFuelValue] = useState(searchParams.get('cp') || 'gazole');
  const [limit, setLimit] = useState(searchParams.get('limit') || 5);
  const [offset, setOffset] = useState(searchParams.get('offset') || 0);
  const { data, isLoading } = useCheapest(fuelValue, +limit, +offset);

  const handleButtonIsActive = (value: string) => {
    setFuelValue(value);
  };

  useEffect(() => {
    router.push(`/meilleurs-prix?fuel=${fuelValue}&limit=${limit}&offset=${offset}`);
  }, [fuelValue, limit, offset, router]);

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
