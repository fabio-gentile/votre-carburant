import Link from 'next/link';
import React from 'react';
import { Wrapper } from '@/components/wrapper';
import { NavItem } from '@/types';

export const Footer = () => {
  const navigationLinks: Array<NavItem> = [
    {
      title: 'Accueil',
      href: '/',
      show: 'DEFAULT',
    },
    {
      title: 'Rechercher',
      href: '/rechercher',
      show: 'DEFAULT',
    },
    {
      title: 'Meilleurs prix',
      href: '/meilleurs-prix',
      show: 'DEFAULT',
    },
    {
      title: 'Favoris',
      href: '/favoris',
      show: 'DEFAULT',
    },
    {
      title: 'À propos',
      href: '/a-propos',
      show: 'DEFAULT',
    },
    {
      title: 'Contact',
      href: '/contact',
      show: 'DEFAULT',
    },
    {
      title: 'Mon compte',
      href: '/profil',
      show: 'DEFAULT',
    },
  ];

  return (
    <footer className='bg-blue-700 py-3 text-xs text-white md:py-4 md:text-sm'>
      <Wrapper className={'flex flex-col justify-center gap-6'}>
        <nav>
          <ul className='flex flex-wrap justify-center gap-4 md:gap-8 '>
            {navigationLinks.map((link) => (
              <li
                key={link.title}
                className='w-fit hover:underline'
              >
                <Link
                  href={link.href}
                  className=''
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className='text-center'>2024 &copy; votre-carburant.fr réalisé par Fabio Gentile</p>
      </Wrapper>
    </footer>
  );
};
