import { PrimaryTitle } from '@/components/ui/title';
import { Metadata } from 'next';
import { getUserBookmarks } from '@/services/bookmarks';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { AverageFuel, Bookmark } from '@/types';
import { getStationById } from '@/services/station';
import { CardStation } from '@/components/card-station';

export const metadata: Metadata = {
  title: 'Favoris',
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  const { data } = await getUserBookmarks(session?.user?.email || '');

  const stations = await Promise.all(
    data.map(async (bookmark: Bookmark) => {
      const { data } = await getStationById(+bookmark.stationId);
      return data[0];
    })
  );

  return (
    <div className='flex flex-col justify-center gap-8 sm:gap-12 lg:gap-16'>
      <PrimaryTitle>Mes favoris</PrimaryTitle>
      <a
        href='mailto:contact@votre-carburant.fr'
        className='hover:underline'
      >
        Pour me contacter : contact@votre-carburant.fr
      </a>
      <CardStation stations={stations} />
    </div>
  );
}
