import { StationDetails } from '@/types';

export const getStationDetails = async (id: number): Promise<{ data: StationDetails }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_INSTANT_FUEL}?where=id%3D${id}`);
  const { results } = await response.json();

  return {
    data: {
      id: results[0].id,
      geom: results[0].geom,
      horaires: JSON.parse(results[0].horaires),
      prix: JSON.parse(results[0].prix),
      adresse: results[0].adresse,
      cp: results[0].cp,
      ville: results[0].ville,
      carburants_disponibles: results[0].carburants_disponibles,
      carburants_indisponibles: results[0].carburants_indisponibles,
      services_service: results[0].services_service,
      horaires_automate_24_24: results[0].horaires_automate_24_24,
      code_departement: results[0].code_departement,
    },
  };

  // return { data: results[0] };
};
