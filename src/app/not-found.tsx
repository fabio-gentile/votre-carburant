import { PrimaryTitle } from '@/components/ui/title';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function NotFoundPage() {
  return (
    <>
      <PrimaryTitle className='mb-8'>Page introuvable</PrimaryTitle>
      <Link href='/'>
        <Button>Revenir à l'accueil</Button>
      </Link>
    </>
  );
}

export default NotFoundPage;
