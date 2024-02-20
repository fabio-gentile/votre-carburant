'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { Session } from 'next-auth';
import { postUserBookmarks } from '@/services/bookmarks';

export function AddBookmark({ session, stationId }: { session: Session | null; stationId: number }) {
  const handleAddBookmark = async () => {
    const add = await postUserBookmarks(session?.user?.email || '', stationId);
  };

  return (
    <>
      <Button onClick={handleAddBookmark}>
        <Icons.bookmarkCheck className='mr-2' />
        Ajouter aux favoris
      </Button>
    </>
  );
}
