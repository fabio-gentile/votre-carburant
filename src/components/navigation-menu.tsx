'use client';

import React, { useState } from 'react';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import {
  BarChart2Icon,
  BookmarkCheck,
  Home,
  LogIn,
  LogOut,
  MessageCircleQuestionIcon,
  Search,
  User,
  UserPlus,
} from 'lucide-react';
import { BurgerMenu } from '@/components/burger-menu';
import { clsx } from 'clsx';
import { NavItem } from '@/types';
import { Wrapper } from '@/components/wrapper';

export const NavigationMenu = () => {
  const [isOpened, setIsOpened] = useState<Boolean>(false);

  const navigationLinks: Array<NavItem> = [
    {
      title: 'Accueil',
      href: '/',
      icon: <Home />,
    },
    {
      title: 'Rechercher',
      href: '/rechercher',
      icon: <Search />,
    },
    {
      title: 'Meilleur prix',
      href: '/meilleurs-prix',
      icon: <BarChart2Icon />,
    },
    {
      title: 'Favoris',
      href: '/favoris',
      icon: <BookmarkCheck />,
    },
    {
      title: 'À propos',
      href: '/a-propos',
      icon: <MessageCircleQuestionIcon />,
    },
    {
      title: 'Se connecter',
      href: '/connexion',
      icon: <LogIn />,
    },
    {
      title: "S'enregister",
      href: '/inscription',
      icon: <UserPlus />,
    },
    {
      title: 'Mon compte',
      href: '/profile',
      icon: <User />,
    },
    {
      title: 'Déconnexion',
      href: '/deconnexion',
      icon: <LogOut />,
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
                  <BurgerMenu title={'Menu burger'} opened={isOpened} handleMenu={handleMenu} />
                </li>
                <li>
                  <Link href='/' className='block w-fit'>
                    <Logo />
                  </Link>
                </li>
              </ul>
              <ul className='flex items-center gap-8'>
                <li className='hidden hover:bg-blue-600 sm:block'>
                  <Link className='rounded-lg p-2 hover:bg-blue-600' href='/rechercher'>
                    Rechercher
                  </Link>
                </li>
                <li className='hidden sm:block'>
                  <Link className='rounded-lg p-2 hover:bg-blue-600' href='/meilleurs-prix'>
                    Meilleurs prix
                  </Link>
                </li>
                <li className='hidden lg:block'>
                  <Link className='rounded-lg p-2 hover:bg-blue-600' href='/favoris'>
                    Favoris
                  </Link>
                </li>
                <li className='hidden lg:block'>
                  <Link className='rounded-lg p-2 hover:bg-blue-600' href='/a-propos'>
                    À propos
                  </Link>
                </li>
                <li>
                  <Link title='Mon Compte' href='/profile'>
                    <User color={'white'} size={36} />
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
              {navigationLinks.map((link) => (
                <li key={link.title} className='w-fit rounded-lg hover:bg-blue-600'>
                  <Link tabIndex={isOpened ? 1 : -1} href={link.href} className='flex items-center gap-2 p-2 '>
                    <span className='w-7'>{link.icon}</span>
                    {link.title}
                  </Link>
                </li>
              ))}
              <li></li>
            </ul>
          </nav>
          <p className='mb-4 text-xs md:text-sm'>2024 &copy; votre-carburant.fr réalisé par Fabio Gentile</p>
        </Wrapper>
      }
    </>
  );
};
