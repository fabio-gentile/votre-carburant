import React from 'react';
import { Fuel } from 'lucide-react';

export const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
      <Fuel
        color='white'
        size={36}
      />
      <h1 style={{ fontSize: '16px !important' }}>votre-carburant.fr</h1>
    </div>
  );
};
