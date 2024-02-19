import { useQuery } from '@tanstack/react-query';
import { CardStation } from '@/types';

interface CheapestApiResponse {
  results: CardStation[];
  total_count: number;
}

export const useCheapest = (fuel: string, limit: number, offset: number) => {
  const { data, isLoading } = useQuery<CheapestApiResponse>({
    queryKey: ['address', [fuel, limit, offset]],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_INSTANT_FUEL}?select=id%2Cadresse%2Ccp%2Cville%2Cgazole_maj%20as%20update%2Cgazole_prix%2Csp95_prix%2Ce85_prix%2Cgplc_prix%2Ce10_prix%2Csp98_prix%2Ccarburants_disponibles%2Ccarburants_indisponibles%2Cservices_service&where=${fuel}_maj%3Enow(days%3D-3)&order_by=${fuel}_prix%20ASC&limit=${limit}&offset=${offset}`
      );

      return await response.json();
    },
    enabled: !!fuel,
  });

  return { data, isLoading } || [];
};
