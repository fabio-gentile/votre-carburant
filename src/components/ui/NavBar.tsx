'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Logo from '@/components/ui/Logo';
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
import BurgerMenu from '@/components/ui/BurgerMenu';
import { clsx } from 'clsx';

type NavigationLinksProps = {
  title: string;
  href: string;
  icon: JSX.Element;
};

const Navbar = () => {
  const [open, setOpen] = useState<Boolean>(false);

  const navigationLinks: Array<NavigationLinksProps> = [
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
      href: '/meilleur-prix',
      icon: <BarChart2Icon />,
    },
    {
      title: 'Mes favoris',
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
    setOpen(!open);
    document.querySelector('body')?.classList.toggle('overflow-hidden');
  };

  return (
    <header
      className={clsx(
        'mx-auto h-full w-full  px-6 py-3 text-white sm:text-xl md:px-12 lg:px-20',
        `${open ? 'overflow-hidden' : ''}`
      )}
    >
      <nav className={clsx('', `${open ? 'flex-col' : ''}`)}>
        <div className='flex items-center justify-between'>
          <ul className='gap flex items-center gap-4'>
            <li>
              <BurgerMenu open={open} handleMenu={handleMenu} />
            </li>
            <li>
              <Link href='/' className='block w-fit'>
                <Logo />
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href='/profile'>
                <User color={'white'} size={36} />
              </Link>
            </li>
          </ul>
        </div>

        {open && (
          <ul className='mt-10 grid gap-4'>
            {navigationLinks.map((link) => (
              <li key={link.title} className='w-fit hover:bg-primary-hover'>
                <Link href={link.href} className='flex items-center gap-2 p-2 '>
                  <span className='w-7'>{link.icon}</span>
                  {link.title}
                </Link>
              </li>
            ))}
            <li></li>
          </ul>
        )}
      </nav>

      {/*mobile menu*/}
    </header>
  );
};

export default Navbar;
