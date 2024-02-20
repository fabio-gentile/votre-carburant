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
      >
        <Icons.logOut />
        Se déconnecter
      </Button>
    </>
  );
};
