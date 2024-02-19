import { PrimaryTitle, TertiaryTitle } from '@/components/ui/title';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profil',
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className='flex flex-col justify-center gap-8 sm:gap-10 lg:gap-12'>
      <PrimaryTitle>Mon profil</PrimaryTitle>
      <div className='flex items-center gap-4'>
        <TertiaryTitle>Vous êtes connecté en tant que {session?.user?.name}</TertiaryTitle>
        <img
          src={session?.user?.image || ''}
          alt={`Photo de profil de ${session?.user?.name}`}
          referrerPolicy='no-referrer'
          className={`size-16 rounded-full ${session?.user?.image ? null : 'bg-gray-400'}`}
        />
      </div>
      <p>Page en construction</p>
      <Link href='/favoris'>
        <Button className='w-fit'>Mes favoris</Button>
      </Link>
    </div>
  );
}
