import React from 'react';
import { Icons } from '@/components/icons';

export const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
      <Icons.fuel
        color='white'
        size={36}
      />

      <h1>votre-carburant.fr</h1>
    </div>
  );
};
