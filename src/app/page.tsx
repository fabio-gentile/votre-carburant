import { SearchStation } from '@/components/search-station';

export default function Home() {
  return (
    <main className='flex flex-col justify-center gap-8 sm:gap-12 lg:gap-16'>
      <h1 className='primary-title text-center'>Le carburant le moins cher, le plus près de chez vous.</h1>
      <SearchStation />
    </main>
  );
}
