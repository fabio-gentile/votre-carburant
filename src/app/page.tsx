import { SearchStation } from '@/components/search-station';
import { getAverageFuel } from '@/services/averageFuel';

export default async function Page() {
  return (
    <main className='flex flex-col justify-center gap-8 sm:gap-12 lg:gap-16'>
      <h1 className='primary-title text-center'>Le carburant le moins cher, le plus près de chez vous.</h1>
      <SearchStation />
      <AverageFuel />
    </main>
  );
}

async function AverageFuel() {
  const currentDay = new Date().toLocaleDateString();
  const data = await getAverageFuel();

  return (
    <>
      <h2 className='secondary-title text-center'>Prix national moyen le {currentDay}</h2>
      <div className='grid grid-cols-3 gap-y-4'>
        {data.map((d) => (
          <div
            key={d.name_fuel}
            className='grid gap-2 text-center'
          >
            <p className='tertiary-title'>{d.average_price.toFixed(2)}€</p>
            <p className='text-placeholder'>{d.name_fuel}</p>
          </div>
        ))}
      </div>
    </>
  );
}
