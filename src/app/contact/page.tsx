import { PrimaryTitle } from '@/components/ui/title';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
};

export default async function Page() {
  return (
    <main className='flex flex-col justify-center gap-8 sm:gap-12 lg:gap-16'>
      <PrimaryTitle>Me contacter</PrimaryTitle>
      <a
        href='mailto:contact@votre-carburant.fr'
        className='hover:underline'
      >
        Pour me contacter : contact@votre-carburant.fr
      </a>
    </main>
  );
}
