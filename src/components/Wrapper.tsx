import React from 'react';
import { clsx } from 'clsx';

type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
  return <div className={clsx('mx-auto w-full max-w-[1200px] px-6 md:px-12 lg:px-16', className)}>{children}</div>;
};

export default Wrapper;
