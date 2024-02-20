import { SearchStation } from '@/components/search-station';
import { getAverageFuel } from '@/services/averageFuel';
import { HomeChart } from '@/components/home-chart';
import { CardStation } from '@/components/card-station';
import { getLatestStations } from '@/services/station';
import { PrimaryTitle, SecondaryTitle } from '@/components/ui/title';

export default async function Page() {
  return (
    <main className='flex flex-col justify-center gap-8 sm:gap-12 lg:gap-16'>
      <PrimaryTitle className='text-center'>Le carburant le moins cher, le plus près de chez vous.</PrimaryTitle>
      <SearchStation />
      <AverageFuel />
      <LatestStations />
    </main>
  );
}

async function AverageFuel() {
  const currentDay = new Date().toLocaleDateString('fr-FR');
  const { averageFuel: data, totalCount } = await getAverageFuel();

  return (
    <>
      <SecondaryTitle className='text-center'>Prix national moyen le {currentDay}</SecondaryTitle>
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
      <HomeChart
        averageFuel={data}
        totalCount={totalCount}
      />
    </>
  );
}

async function LatestStations() {
  const { data } = await getLatestStations(5);

  if (data)
    return (
      <>
        <SecondaryTitle className='text-center'>Dernière stations mises à jours</SecondaryTitle>
        <CardStation stations={data} />
      </>
    );
  else return false;
}
