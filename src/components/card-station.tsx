import * as React from 'react';

import { cn, formatTime } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faBaby,
  faBox,
  faCar,
  faCaravan,
  faCoffee,
  faCouch,
  faCreditCard,
  faGasPump,
  faGauge,
  faHandsBubbles,
  faHome,
  faOilCan,
  faPlug,
  faShower,
  faSoap,
  faStore,
  faToilet,
  faTools,
  faTruck,
  faUtensils,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FuelType, CardStation } from '@/types';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const CardStationContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-4 rounded-md bg-white px-3 py-2 md:flex-row lg:px-4 lg:py-4', className)}
      {...props}
    />
  )
);
CardStationContainer.displayName = 'CardStationContainer';

const CardStationInformation = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-2 sm:gap-3 md:w-2/5 lg:gap-4', className)}
      {...props}
    />
  )
);
CardStationInformation.displayName = 'CardStationInformation';

const CardStationTitle = React.forwardRef<HTMLAnchorElement, React.LinkHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <Link
      href={props.href || '#'}
      className={cn('font-medium md:text-xl lg:text-2xl', className)}
      {...props}
      ref={ref}
    />
  )
);
CardStationTitle.displayName = 'CardStationTitle';

const CardStationLocalisation = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-2 text-sm text-placeholder', className)}
      {...props}
    >
      <span title='Adresse'>
        <Icons.mapPin />
      </span>

      {props.children}
    </div>
  )
);
CardStationLocalisation.displayName = 'CardStationLocalisation';

const CardStationUpdate = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-2.5 text-sm text-placeholder', className)}
      {...props}
    >
      <span title='Dernière mise à jour'>
        <Icons.clock />
      </span>
      {props.children}
    </div>
  )
);
CardStationUpdate.displayName = 'CardStationUpdate';

const CardStationServices = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-2.5', className)}
      {...props}
    />
  )
);
CardStationServices.displayName = 'CardStationServices';

const CardStationServiceIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-wrap items-center gap-4', className)}
      {...props}
    />
  )
);
CardStationServiceIcon.displayName = 'CardStationServiceIcon';

const CardStationServiceIconContent = React.forwardRef<
  SVGSVGElement,
  { className?: string; service: string; serviceName?: string }
>(({ className, service, serviceName }, ref) => {
  const getServiceIcon = (serviceName: string): IconDefinition | null => {
    switch (serviceName.toLowerCase()) {
      case 'vente de gaz domestique (butane, propane)':
        return faGasPump;
      case 'station de gonflage':
        return faGauge;
      case 'dab (distributeur automatique de billets)':
        return faCreditCard;
      case 'automate cb 24/24':
        return faCar;
      case 'boutique alimentaire':
        return faCoffee;
      case 'boutique non alimentaire':
        return faStore;
      case 'piste poids lourds':
        return faTruck;
      case 'carburant additivé':
        return faOilCan;
      case 'lavage automatique':
        return faCar;
      case 'toilettes publiques':
        return faToilet;
      case 'lavage manuel':
        return faHandsBubbles;
      case 'restauration à emporter':
        return faUtensils;
      case 'location de véhicule':
        return faCar;
      case 'relais colis':
        return faBox;
      case 'laverie':
        return faSoap;
      case "vente d'additifs carburants":
        return faOilCan;
      case 'services réparation / entretien':
        return faTools;
      case 'restauration sur place':
        return faHome;
      case 'wifi':
        return faWifi;
      case 'vente de fioul domestique':
        return faGasPump;
      case 'vente de pétrole lampant':
        return faGasPump;
      case 'bornes électriques':
        return faPlug;
      case 'bar':
        return faCouch;
      case 'espace bébé':
        return faBaby;
      case 'douches':
        return faShower;
      case 'aire de camping-cars':
        return faCaravan;
      default:
        return null;
    }
  };

  const icon = getServiceIcon(service);
  return (
    icon && (
      <span
        title={service}
        className={cn(`${serviceName ? 'flex items-center gap-2' : ''} `, className)}
      >
        <FontAwesomeIcon
          icon={icon}
          ref={ref}
          className={cn('w-4 gap-2.5 text-placeholder sm:w-5 md:w-6', className)}
        />
        {serviceName ? serviceName : null}
      </span>
    )
  );
});
CardStationServiceIconContent.displayName = 'CardStationServiceIconContent';

const CardStationFuels = React.forwardRef<HTMLAnchorElement, React.LinkHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <Link
      ref={ref}
      href={props.href || '#'}
      className={cn('grid grid-cols-3 gap-4 md:w-3/5', className)}
      {...props}
    />
  )
);
CardStationFuels.displayName = 'CardStationFuels';

const CardStationFuel = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('flex flex-col ', className)}
      {...props}
    />
  )
);
CardStationFuel.displayName = 'CardStationFuel';

const CardStationFuelName = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        'flex flex-col rounded-t-md bg-primary py-1.5 text-center text-sm text-white sm:text-base lg:text-xl',
        className
      )}
      {...props}
    />
  )
);
CardStationFuelName.displayName = 'CardStationFuelName';

const CardStationFuelPrice = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center rounded-b-md bg-white-bg py-1.5 sm:min-h-10 sm:text-xl lg:min-h-11 lg:text-2xl',
        className
      )}
      {...props}
    />
  )
);
CardStationFuelPrice.displayName = 'CardStationFuelPrice';

const CardStation: React.FC<{ stations: CardStation[] | undefined }> = ({ stations }) => {
  const FUEL_NAME: FuelType[] = ['Gazole', 'SP98', 'E10', 'SP95', 'E85', 'GPLc'];
  // console.log(stations)
  return (
    <div className='grid gap-4 sm:gap-6 lg:gap-8'>
      {stations &&
        stations.map((station) => {
          const differenceMs = +new Date() + 60 * 60 * 1000 - +new Date(station.update);
          const formattedTime = formatTime(differenceMs);

          return (
            <CardStationContainer key={station.id}>
              <CardStationInformation>
                <CardStationTitle
                  href={`/station/${station.id}`}
                  className='hover:underline'
                >
                  Station Essence à {station.ville}
                </CardStationTitle>
                <CardStationLocalisation>
                  {`${station.adresse}, ${station.cp} ${station.ville}`}
                </CardStationLocalisation>
                <CardStationUpdate>mis à jour : {formattedTime}</CardStationUpdate>
                {station.services_service && (
                  <CardStationServices>
                    <CardStationTitle
                      href={`/station/${station.id}`}
                      className='text-md md:text-base lg:text-xl'
                    >
                      Services disponibles
                    </CardStationTitle>
                    <CardStationServiceIcon>
                      {station.services_service.map((service) => (
                        <CardStationServiceIconContent
                          key={service}
                          service={service}
                        />
                      ))}
                    </CardStationServiceIcon>
                  </CardStationServices>
                )}
              </CardStationInformation>
              <CardStationFuels href={`/station/${station.id}`}>
                {FUEL_NAME.map((fuel) => {
                  // @ts-ignore
                  const price = +station[fuel.toLowerCase() + '_prix'];
                  return (
                    <CardStationFuel key={fuel}>
                      <CardStationFuelName>{fuel}</CardStationFuelName>
                      <CardStationFuelPrice title={!price ? 'Prix inconnu' : ''}>
                        {price ? price.toFixed(2) + '€' : <Icons.none />}
                      </CardStationFuelPrice>
                    </CardStationFuel>
                  );
                })}
              </CardStationFuels>
            </CardStationContainer>
          );
        })}
    </div>
  );
};

const CardStationSkeleton: React.FC<{ count: number }> = ({ count = 5 }) => {
  const FUEL_NAME: FuelType[] = ['Gazole', 'SP98', 'E10', 'SP95', 'E85', 'GPLc'];
  const cards = [];

  for (let i = 0; i < count; i++) {
    cards.push(
      <CardStationContainer key={i}>
        <CardStationInformation>
          <Skeleton className='h-5 w-full' />
          <Skeleton className='h-5 w-full' />
          <Skeleton className='h-5 w-full' />
          <CardStationServices>
            <Skeleton className='h-5 w-full' />
            <CardStationServiceIcon>
              <Skeleton className='h-5 w-8' />
            </CardStationServiceIcon>
            <CardStationServiceIcon>
              <Skeleton className='h-5 w-8' />
            </CardStationServiceIcon>
          </CardStationServices>
        </CardStationInformation>
        <CardStationFuels>
          {FUEL_NAME.map((fuel) => {
            return (
              <CardStationFuel key={fuel}>
                <Skeleton className='h-5 w-full sm:min-h-10 lg:min-h-8' />
                <Skeleton className='mt-4 h-5 w-full md:mt-6 lg:mt-8' />
              </CardStationFuel>
            );
          })}
        </CardStationFuels>
      </CardStationContainer>
    );
  }

  return <div className='grid gap-4 sm:gap-6 lg:gap-8'>{cards}</div>;
};

export {
  CardStation,
  CardStationContainer,
  CardStationInformation,
  CardStationTitle,
  CardStationLocalisation,
  CardStationUpdate,
  CardStationServices,
  CardStationServiceIcon,
  CardStationFuels,
  CardStationFuel,
  CardStationFuelName,
  CardStationFuelPrice,
  CardStationServiceIconContent,
  CardStationSkeleton,
};
