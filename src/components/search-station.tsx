'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { Select } from '@/components/ui/select';
import { useDebounce } from '@/hooks/use-debounce';
import { useAddress, useReverseGeolocation } from '@/hooks/use-address';
import { AddressFeature } from '@/types';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/icons';

interface FuelType {
  value: string;
  name: string;
}

const listFuels: FuelType[] = [
  { value: '', name: 'Type de carburant (optionnel)' },
  { value: 'E95', name: 'Essence 95' },
  { value: 'E98', name: 'Essence 98' },
  { value: 'SP95', name: 'Sans plomb 95' },
  { value: 'SP98', name: 'Sans plomb 98' },
  { value: 'Gasoil', name: 'Gasoil' },
  { value: 'GPL', name: 'Gaz de pétrole liquéfié' },
];

export const SearchStation = () => {
  const [suggestions, setSuggestions] = useState<AddressFeature[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState({
    address: '',
    fuelType: '',
  });
  const [isAddressSet, setIsAddressSet] = useState(false);
  const debounceQuery = useDebounce(query.address, 250);

  const [accessGranted, setAccessGranted] = useState(false);
  const { data: addressData, isPending: isPendingAddress } = useAddress(debounceQuery);
  const { data: coord, isPending: isPendingReverseGeolocation } = useReverseGeolocation(accessGranted);
  const router = useRouter();

  const [error, setError] = useState('');

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = e.target;
    setQuery({ ...query, [name]: value });

    if (name === 'address') setIsAddressSet(false);
  };

  useEffect(() => {
    if (isAddressSet) return;

    if (debounceQuery.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
    } else if (!isPendingAddress) {
      setShowSuggestions(true);
      setSuggestions(addressData || []);
    }
  }, [addressData, debounceQuery, isAddressSet, isPendingAddress]);

  const handleSetQuery = (e: React.MouseEvent<HTMLLIElement>) => {
    setQuery({ ...query, address: e.currentTarget.textContent || '' });
    setShowSuggestions(false);
    setIsAddressSet(true);
  };

  const handleGeolocation = () => {
    setAccessGranted(true);
  };

  useEffect(() => {
    if (coord?.countryName && coord?.countryName !== 'France') {
      setError("La géolocalisation est possible uniquement dans l'héxagone français.");
    } else {
      setQuery({ ...query, address: coord?.city || '' });
    }
  }, [coord]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (query.address.length < 3) {
      setError('Veuillez entrer une adresse');
      return;
    }

    // const address = suggestions.find((suggestion) => suggestion.properties.label === query.address);
    const address = suggestions.find((suggestion) => suggestion.properties.label === query.address.replace(',', ''));

    router.push(`/rechercher?where=cp=${address?.properties.postcode}&limit=`);
  };

  return (
    <>
      <form
        action=''
        className='flex flex-col gap-4 lg:flex-row'
        onSubmit={handleSubmit}
      >
        <div className='w-full lg:w-4/6'>
          <div className='relative inline-block w-full'>
            <Input
              placeholder='Votre localité'
              name='address'
              value={query.address}
              onChange={handleChangeForm}
              className={error && 'border-destructive'}
            />
            <Icons.locate
              className='absolute right-3 top-2 cursor-pointer text-placeholder'
              onClick={handleGeolocation}
            />
          </div>
          {error && <p className='mt-3 px-4 text-sm text-destructive'>{error}</p>}
          {showSuggestions && (
            <ul className='mt-2 w-full rounded-md bg-white px-3 py-2 md:mt-3 '>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.properties.id}
                  data-coordinate-x={suggestion.geometry.coordinates[0]}
                  data-coordinate-y={suggestion.geometry.coordinates[1]}
                  data-city-y={suggestion.properties.city}
                  data-postcode={suggestion.properties.postcode}
                  data-street={suggestion.properties.street}
                  onClick={handleSetQuery}
                  className='rounded-md p-1 text-sm font-light text-placeholder/90 hover:cursor-pointer hover:bg-white-bg'
                >
                  {suggestion.properties.name}, {suggestion.properties.postcode} {suggestion.properties.city}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='relative inline-block w-full lg:w-1/3'>
          <Select
            name='fuelType'
            className='cursor-pointer'
            onChange={handleChangeForm}
          >
            {listFuels.map((fuel) => (
              <option
                key={fuel.value}
                value={fuel.value}
                className='flex w-full cursor-default select-none rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none'
              >
                {fuel.name}
              </option>
            ))}
          </Select>
          <Icons.chevronUpDown className='pointer-events-none absolute right-3 top-2 cursor-pointer text-placeholder' />
        </div>
        <Button className='w-full lg:w-fit'>Rechercher</Button>
      </form>
    </>
  );
};
