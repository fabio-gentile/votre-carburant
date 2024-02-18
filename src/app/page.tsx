import { SearchStation } from '@/components/search-station';
import { getAverageFuel } from '@/services/averageFuel';
import { HomeChart } from '@/components/home-chart';
import {
  CardStationContainer,
  CardStationInformation,
  CardStationLocalisation,
  CardStationTitle,
  CardStationUpdate,
  CardStationServices,
  CardStationServiceIcon,
  CardStationFuel,
  CardStationFuelName,
  CardStationFuelPrice,
  CardStationFuels,
  CardStationServiceIconContent,
  CardStation,
} from '@/components/card-station';
import { getLatestStations } from '@/services/station';
import { FuelType } from '@/types';
import { Icons } from '@/components/icons';
import { millisecondsToHoursAndMinutes } from '@/lib/utils';

export default async function Page() {
  return (
    <main className='flex flex-col justify-center gap-8 sm:gap-12 lg:gap-16'>
      <h1 className='primary-title text-center'>Le carburant le moins cher, le plus près de chez vous.</h1>
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
      <HomeChart
        averageFuel={data}
        totalCount={totalCount}
      />
    </>
  );
}

async function LatestStations() {
  const { data } = await getLatestStations();

  return (
    <>
      <h2 className='secondary-title text-center'>Dernière stations mises à jours</h2>
      <CardStation stations={data} />
    </>
  );
}
