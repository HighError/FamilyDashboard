import { UserContext } from '@/contexts/UserContext';
import Router from 'next/router';
import React, { ReactNode, useContext } from 'react';

import Loading from '../Loading';

const OnlyForNotAuth = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    Router.push('/profile');
  }

  return <div>{children}</div>;
};

export default OnlyForNotAuth;
