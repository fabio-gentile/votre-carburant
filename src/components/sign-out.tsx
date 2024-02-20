'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export const SignOut = () => {
  return (
    <>
      <Button
        variant='secondary'
        onClick={() => signOut()}
        className='gap-4 md:gap-6 lg:gap-8'
      >
        <Icons.logOut />
        Se déconnecter
      </Button>
    </>
  );
};
