import './burger-menu.css';
import React from 'react';

export type Props = {
  opened: Boolean;
  handleMenu: () => void;
  title?: string;
};

export const BurgerMenu: React.FC<Props> = ({ opened, handleMenu, title }) => {
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
