'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

type SessionProviderProps = {
  children: React.ReactNode;
};

export const NextAuthProvider: React.FC<SessionProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
