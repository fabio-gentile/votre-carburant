import { getStationDetails } from '@/services/station-details';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { SecondaryTitle, TertiaryTitle } from '@/components/ui/title';
import {
  CardStation,
  CardStationFuel,
  CardStationFuelName,
  CardStationFuelPrice,
  CardStationFuels,
  CardStationLocalisation,
  CardStationServiceIcon,
  CardStationServiceIconContent,
  CardStationServices,
  CardStationUpdate,
} from '@/components/card-station';
import { formatTime } from '@/lib/utils';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { getNearestStations } from '@/services/station';
import type { Metadata, ResolvingMetadata } from 'next';
import { Skeleton } from '@/components/ui/skeleton';
import { AddBookmark } from '@/components/add-bookmark';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

const DynamicMap = dynamic(() => import('@/components/openstreetmap'), {
  loading: () => <Skeleton className='h-64 w-full sm:h-80 lg:w-3/5' />,
  ssr: false,
});

type MetadataProps = {
  params: { id: number };
};

export async function generateMetadata({ params }: MetadataProps, parent: ResolvingMetadata): Promise<Metadata> {
  const id = params.id;
  const { data } = await getStationDetails(id);

  return {
    title: `Station à ${data.ville}`,
  };
}

export default async function Page({ params: { id } }: { params: { id: number } }) {
  const { data } = await getStationDetails(id);
  const session = await getServerSession(authOptions);
  let mostRecenteUpdate: Date = new Date('1966-01-01');
  for (const price of data.prix) {
    if (new Date(price['@maj']) >= mostRecenteUpdate) mostRecenteUpdate = new Date(price['@maj']);
  }
  const differenceMs = +new Date() - +mostRecenteUpdate;
  const formattedTime = formatTime(differenceMs);

  const { data: nearestStations } = await getNearestStations(data.cp, data.code_departement, 5);

  return (
    <div className='grid gap-8 md:gap-12'>
      <div className='flex flex-wrap gap-4'>
        {session?.user?.email ? (
          <AddBookmark
            session={session}
            stationId={data.id}
          />
        ) : null}

        <a
          href={`https://www.waze.com/live-map/directions?to=ll.${data.geom.lat}%2C${data.geom.lon}`}
          target='_blank'
        >
          <Button variant='secondary'>
            <Icons.waze className='mr-2 w-6 object-contain' />
            Waze
          </Button>
        </a>
        <a
          // href={`https://maps.google.com/?q=${data.geom.lat},${data.geom.lon}`}
          href={`https://www.google.com/maps/search/?api=1&query=${data.adresse.replaceAll(' ', '+')}${data.cp}${data.ville.replaceAll(' ', '+')}`}
          target='_blank'
        >
          <Button variant='secondary'>
            <Icons.googleMaps className='mr-2 w-6 object-contain' />
            Google Maps
          </Button>
        </a>
      </div>
      <div className='flex flex-col gap-4 lg:flex-row lg:gap-12'>
        <div className='flex flex-col gap-4 lg:w-2/5'>
          <SecondaryTitle>Station Essence à {data.ville}</SecondaryTitle>
          <CardStationLocalisation>{`${data.adresse}, ${data.cp} ${data.ville}`}</CardStationLocalisation>
          <CardStationUpdate>mis à jour : {formattedTime}</CardStationUpdate>

          <CardStationFuels className='md:w-full lg:w-full'>
            {data.prix.map((fuel) => {
              const price = +fuel['@valeur'];
              return (
                <CardStationFuel key={fuel['@id']}>
                  <CardStationFuelName>{fuel['@nom']}</CardStationFuelName>
                  <CardStationFuelPrice className='bg-white'>{price.toFixed(2) + '€'}</CardStationFuelPrice>
                </CardStationFuel>
              );
            })}
          </CardStationFuels>
        </div>

        <DynamicMap
          className='z-[1] lg:w-3/5'
          latitude={+data.geom.lat}
          longitude={+data.geom.lon}
          address={`${data.adresse}, ${data.cp} ${data.ville}`}
          prices={data.prix}
        />
      </div>
      <div className='flex flex-col gap-4 lg:flex-row lg:gap-12'>
        {data.horaires && (
          <div className='flex flex-col gap-4 lg:w-1/2 lg:gap-12'>
            <TertiaryTitle>Horaires</TertiaryTitle>
            <table className='table-auto'>
              <thead>
                <tr className='p-2 font-bold'>
                  <th className='p-2 text-left'>Jour</th>
                  <th className='p-2'>Ouverture</th>
                  <th className='p-2'>Fermeture</th>
                </tr>
              </thead>
              <tbody>
                {data?.horaires?.jour.map((day) => {
                  return (
                    <tr
                      key={day['@id']}
                      className='p-2'
                    >
                      <td className='p-2 text-sm'>{day['@nom']}</td>
                      <td className='p-2 text-center'>
                        {data.horaires_automate_24_24 === 'Oui'
                          ? '24/24'
                          : day.horaire?.['@ouverture'] || 'Non spécifié'}
                      </td>
                      <td className='p-2 text-center'>
                        {data.horaires_automate_24_24 === 'Oui'
                          ? '24/24'
                          : day.horaire?.['@fermeture'] || 'Non spécifié'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {data.services_service && (
          <CardStationServices className='grid h-fit gap-4 lg:w-1/2 lg:gap-12'>
            <TertiaryTitle>Services disponibles</TertiaryTitle>
            <CardStationServiceIcon className='grid gap-4'>
              {data.services_service.map((service) => (
                <CardStationServiceIconContent
                  key={service}
                  service={service}
                  serviceName={service}
                  className='text-sm text-placeholder sm:text-base'
                />
              ))}
            </CardStationServiceIcon>
          </CardStationServices>
        )}
      </div>
      <div className='flex flex-col gap-4 lg:gap-12'>
        <TertiaryTitle>Stations service à proximité</TertiaryTitle>
        <CardStation stations={nearestStations} />
      </div>
    </div>
  );
}
