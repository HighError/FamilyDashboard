import { UserContext } from '@/contexts/UserContext';
import Router from 'next/router';
import React, { ReactNode, useContext } from 'react';

import Loading from '../Loading';

const OnlyForAuth = ({ children }: { children: ReactNode }) => {
  const { user, error, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Loading />;
  }

  if (!user || error) {
    Router.push(`${process.env.NEXT_PUBLIC_ID_URL ?? ''}/login`);
  }

  return <div>{children}</div>;
};

export default OnlyForAuth;
