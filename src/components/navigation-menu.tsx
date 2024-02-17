'use client';

import React, { useState } from 'react';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { BurgerMenu } from '@/components/burger-menu';
import { clsx } from 'clsx';
import { NavItem } from '@/types';
import { Wrapper } from '@/components/wrapper';
import { useSession } from 'next-auth/react';

export const NavigationMenu = () => {
  const [isOpened, setIsOpened] = useState<Boolean>(false);
  const { data: session, status } = useSession();

  const navigationLinks: Array<NavItem> = [
    {
      title: 'Accueil',
      href: '/',
      show: 'DEFAULT',
      icon: <Icons.home />,
    },
    {
      title: 'Rechercher',
      href: '/rechercher',
      show: 'DEFAULT',
      icon: <Icons.search />,
    },
    {
      title: 'Meilleur prix',
      href: '/meilleurs-prix',
      show: 'DEFAULT',
      icon: <Icons.barChart2 />,
    },
    {
      title: 'Favoris',
      href: '/favoris',
      show: 'DEFAULT',
      icon: <Icons.bookmarkCheck />,
    },
    {
      title: 'À propos',
      href: '/a-propos',
      show: 'DEFAULT',
      icon: <Icons.messageCircleQuestion />,
    },
    {
      title: 'Contact',
      href: '/contact',
      show: 'DEFAULT',
      icon: <Icons.mailQuestion />,
    },
    {
      title: 'Se connecter',
      href: '/connexion',
      show: 'NOT AUTHENTICATED',
      icon: <Icons.logIn />,
    },
    {
      title: 'Mon compte',
      href: '/profile',
      show: 'AUTHENTICATED',
      icon: <Icons.user />,
    },
    {
      title: 'Déconnexion',
      href: '/deconnexion',
      show: 'AUTHENTICATED',
      icon: <Icons.logOut />,
    },
  ];
  const handleMenu = () => {
    setIsOpened(!isOpened);
    document.querySelector('body')?.classList.toggle('overflow-hidden');
  };

  return (
    <>
      <header
        className={clsx(
          'z-50 mx-auto w-full bg-blue-700 py-3 text-white ',
          `${isOpened ? 'overflow-hidden' : 'h-full'}`
        )}
      >
        <Wrapper className={`max-w-full`}>
          <nav className={clsx('', `${isOpened ? 'flex-col' : ''}`)}>
            <div className='flex items-center justify-between'>
              <ul className='gap flex items-center gap-4'>
                <li className='lg:hidden'>
                  <BurgerMenu
                    title={'Menu burger'}
                    opened={isOpened}
                    handleMenu={handleMenu}
                  />
                </li>
                <li>
                  <Link
                    href='/'
                    className='block w-fit'
                  >
                    <Logo />
                  </Link>
                </li>
              </ul>
              <ul className='flex items-center gap-8'>
                <li className='relative hidden sm:block'>
                  <Link
                    className='rounded-lg p-2 hover:bg-white/10'
                    href='/rechercher'
                  >
                    Rechercher
                  </Link>
                </li>
                <li className='hidden sm:block'>
                  <Link
                    className='rounded-lg p-2 hover:bg-white/10'
                    href='/meilleurs-prix'
                  >
                    Meilleurs prix
                  </Link>
                </li>
                <li className='hidden lg:block'>
                  <Link
                    className='rounded-lg p-2 hover:bg-white/10'
                    href='/favoris'
                  >
                    Favoris
                  </Link>
                </li>
                <li className='hidden lg:block'>
                  <Link
                    className='rounded-lg p-2 hover:bg-white/10'
                    href='/a-propos'
                  >
                    À propos
                  </Link>
                </li>
                <li>
                  <Link
                    title='Mon Compte'
                    href='/profile'
                  >
                    <Icons.user
                      color={'white'}
                      size={36}
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </Wrapper>

        {/*mobile menu*/}
        {isOpened && (
          <div
            onClick={handleMenu}
            className={clsx(
              'absolute bottom-0 left-0 z-10 min-h-[calc(100vh-60px)] w-full bg-black transition-all',
              `${isOpened ? 'bg-opacity-80' : 'bg-opacity-0'}`
            )}
          ></div>
        )}
      </header>

      {
        <Wrapper
          className={clsx(
            'absolute bottom-0 z-50 mx-0 flex max-w-fit flex-col justify-between bg-blue-700 pt-10 text-white transition-all',
            `${isOpened ? 'left-0 min-h-[calc(100vh-59px)] overflow-hidden' : '-left-[101vw] h-full'}`
          )}
        >
          <nav>
            <ul className='grid gap-4 '>
              {navigationLinks.map((link) => {
                if (
                  link.show === 'DEFAULT' ||
                  (link.show === 'AUTHENTICATED' && status === 'authenticated') ||
                  (link.show === 'NOT AUTHENTICATED' && status === 'unauthenticated')
                ) {
                  return (
                    <li
                      key={link.title}
                      className='inline-flex'
                    >
                      <Link
                        tabIndex={isOpened ? 1 : -1}
                        href={link.href}
                        className='flex items-center gap-2 rounded-lg p-2 hover:bg-white/10'
                      >
                        <span className='w-7'>{link.icon}</span>
                        {link.title}
                      </Link>
                    </li>
                  );
                }
              })}
              <li></li>
            </ul>
          </nav>
          <p className='mb-4 text-xs md:text-sm'>2024 &copy; votre-carburant.fr réalisé par Fabio Gentile</p>
        </Wrapper>
      }
    </>
  );
};
