import './BurgerMenu.css';
import { BurgerMenu } from '@/types';
import React from 'react';

const BurgerMenu: React.FC<BurgerMenu> = ({ opened, handleMenu, title }) => {
  return (
    <svg
      onClick={handleMenu}
      className={`${opened ? 'active' : ''} burger-btn h-9 w-8 cursor-pointer fill-white `}
      viewBox='0 0 40 26'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect className='w-full ' height='3' />
      <rect className='w-full' height='3' y='12' />
      <rect className='w-full' height='3' y='24' />
      {title && <title>{title}</title>}
    </svg>
  );
};

export default BurgerMenu;
