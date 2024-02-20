import { useQuery } from '@tanstack/react-query';
import { AddressFeature } from '@/types';
import axios from 'axios';
import { getGeolocation } from '@/lib/geolocation';

export const useAddress = (query: string) => {
  const { data, isPending } = useQuery<AddressFeature[]>({
    queryKey: ['address', query],
    queryFn: async () => {
      console.log('query ', query.length);
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_ADDRESS}?q=${query}&type=street&autocomplete=1`);

      return data.features.map((feature: AddressFeature) => ({
        type: feature.type,
        geometry: feature.geometry,
        properties: feature.properties,
      }));
    },
    staleTime: 24 * 60 * 60 * 1000,
    enabled: query.length > 2,
  });

  return { data, isPending } || [];
};

export const useReverseGeolocation = (accessGranted = false) => {
  const { data, isPending } = useQuery<any>({
    queryKey: ['reverseGeolocation'],
    queryFn: async () => {
      const position = await getGeolocation();
      const { latitude, longitude } = position;
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_REVERSE_GEOLOCATION}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );

      return data;
    },
    staleTime: 24 * 60 * 60 * 1000,
    enabled: accessGranted,
  });

  return { data, isPending } || [];
};
