import { useQuery } from '@tanstack/react-query';
import { CardStation } from '@/types';

interface StationApiResponse {
  results: CardStation[];
  total_count: number;
  error_code?: string;
}

export const useStation = (postalCode: string | null, fuelType: string | null, limit: string, offset: string) => {
  const { data, isLoading } = useQuery<StationApiResponse>({
    queryKey: ['address', [postalCode, fuelType, limit]],
    queryFn: async () => {
      if (fuelType) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_INSTANT_FUEL}?select=id%2Cadresse%2Ccp%2Cville%2Cgazole_maj%20as%20update%2Cgazole_prix%2Csp95_prix%2Ce85_prix%2Cgplc_prix%2Ce10_prix%2Csp98_prix%2Ccarburants_disponibles%2Ccarburants_indisponibles%2Cservices_service&where=${fuelType}_prix%20is%20not%20null%20AND%20cp%3D${postalCode}&limit=${limit}&offset=${offset}`
        );

        return await response.json();
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_INSTANT_FUEL}?select=id%2Cadresse%2Ccp%2Cville%2Cgazole_maj%20as%20update%2Cgazole_prix%2Csp95_prix%2Ce85_prix%2Cgplc_prix%2Ce10_prix%2Csp98_prix%2Ccarburants_disponibles%2Ccarburants_indisponibles%2Cservices_service&where=cp%3D${postalCode}&limit=${limit}&offset=${offset}`
        );

        return await response.json();
      }
    },
    enabled: !!postalCode,
  });

  return { data, isLoading } || [];
};
