import Link from 'next/link';
import React from 'react';

type NavigationLinksProps = {
  title: string;
  href: string;
};

const Footer = () => {
  const navigationLinks: Array<NavigationLinksProps> = [
    {
      title: 'Accueil',
      href: '/',
    },
    {
      title: 'Rechercher',
      href: '/rechercher',
    },
    {
      title: 'Meilleur prix',
      href: '/meilleur-prix',
    },
    {
      title: 'À propos',
      href: '/a-propos',
    },
    {
      title: 'Mon compte',
      href: '/profile',
    },
  ];

  return (
    <footer className='flex flex-col justify-center gap-6 bg-primary px-5 py-3 text-xs text-white md:py-4 '>
      <nav>
        <ul className='flex flex-wrap justify-center gap-4 md:gap-8 '>
          {navigationLinks.map((link) => (
            <li key={link.title} className='w-fit hover:bg-primary-hover'>
              <Link href={link.href} className=''>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className='mx-auto flex items-center gap-2'>
        <p>2024 &copy; votre-carburant.fr</p>
        <p>réalisé par Fabio Gentile</p>
      </div>
    </footer>
  );
};

export default Footer;
