import React from 'react';
import { number } from 'prop-types';

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  show: 'DEFAULT' | 'AUTHENTICATED' | 'NOT AUTHENTICATED';
}

interface Address {
  label: string;
  score: number;
  id: string;
  name: string;
  postcode: string;
  citycode: string;
  x: number;
  y: number;
  city: string;
  context: string;
  type: string;
  importance: number;
  street: string;
}

interface AddressGeometry {
  type: string;
  coordinates: [number, number];
}

export interface AddressFeature {
  type: string;
  geometry: AddressGeometry;
  properties: Address;
}

interface StationSchedule {
  '@id': string;
  '@nom': string;
  '@ferme': string;
  horaire: {
    '@ouverture': string;
    '@fermeture': string;
  };
}

export interface Station {
  id: string;
  cp: string;
  pop: string;
  adresse: string;
  ville: string;
  horaires: {
    '@automate-24-24': string;
    jour: StationSchedule[];
  };
  rupture: {
    '@id': string;
    '@nom': string;
    '@debut': string;
    '@fin': string;
  };
  fermeture: string | null;
  geom: {
    lon: number;
    lat: number;
  };
  prix_maj: string;
  prix_id: string;
  prix_valeur: number;
  prix_nom: string;
  com_arm_code: string;
  com_arm_name: string;
  epci_code: string;
  epci_name: string;
  dep_code: string;
  dep_name: string;
  reg_code: string;
  reg_name: string;
  services_service: string[];
  rupture_nom: string;
  rupture_debut: string;
  rupture_fin: string | null;
  horaires_automate_24_24: string;
}

export interface AverageFuel {
  name_fuel: string;
  average_price: number;
  count: number;
}

export type FuelType = 'Gazole' | 'SP95' | 'E85' | 'GPLc' | 'E10' | 'SP98';

export type CardStation = {
  id: number;
  adresse: string;
  cp: string;
  ville: string;
  update: string;
  gazole_prix: string | null;
  sp95_prix: string | null;
  e85_prix: string | null;
  gplc_prix: string | null;
  e10_prix: string | null;
  sp98_prix: string | null;
  carburants_disponibles: FuelType[];
  carburants_indisponibles: FuelType[];
  services_service: string[];
};

export interface StationDetails {
  geom: {
    lon: number;
    lat: number;
  };
  horaires: Schedule | null;
  prix: Price[];
  horaires_automate_24_24: string | null;
  id: number;
  adresse: string;
  cp: number;
  ville: string;
  carburants_disponibles: string[] | null;
  carburants_indisponibles: string[] | null;
  services_service: string[] | null;
  code_departement: number;
}

export interface Price {
  '@nom': string;
  '@id': string;
  '@maj': string;
  '@valeur': string;
}

interface Schedule {
  '@automate-24-24': string;
  jour: [
    {
      '@id': string;
      '@nom': string;
      '@ferme': string;
      horaire?: {
        '@ouverture': string;
        '@fermeture': string;
      };
    },
  ];
}
