import './BurgerMenu.css';

type BurgerMenuProps = {
  open: Boolean;
  handleMenu: () => void;
};

const BurgerMenu: React.FC<BurgerMenuProps> = ({ open, handleMenu }) => {
  return (
    <svg
      onClick={handleMenu}
      className={`${open ? 'active' : ''} burger-btn h-9 w-8 cursor-pointer fill-white`}
      viewBox='0 0 40 26'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect className='w-full' height='3' />
      <rect className='w-full' height='3' y='12' />
      <rect className='w-full' height='3' y='24' />
    </svg>
  );
};

export default BurgerMenu;
