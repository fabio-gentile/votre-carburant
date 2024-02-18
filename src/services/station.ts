import { CardStation } from '@/types';

export const getLatestStations = async (limit: number = 3): Promise<{ data: CardStation[] }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_INSTANT_FUEL}?select=id%2Cadresse%2Ccp%2Cville%2Cgazole_maj%20as%20update%2Cgazole_prix%2Csp95_prix%2Ce85_prix%2Cgplc_prix%2Ce10_prix%2Csp98_prix%2Ccarburants_disponibles%2Ccarburants_indisponibles%2Cservices_service&order_by=gazole_maj%20DESC&limit=${limit}`
  );
  const { results } = await response.json();

  return { data: results };
};
