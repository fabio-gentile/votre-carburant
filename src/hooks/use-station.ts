import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Station } from '@/types';

interface StationApiResponse {
  results: Station[];
  total_count: number;
}

export const useStation = (where: string | null, limit: string) => {
  const { data, isLoading } = useQuery<StationApiResponse>({
    queryKey: ['address', [where, limit]],
    queryFn: async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_FUEL}?where=${where}&limit=${limit}`);
      console.log(`${process.env.NEXT_PUBLIC_API_FUEL}?where=${where}&limit=${limit}`);
      return data;
    },
  });

  return { data, isLoading } || [];
};
