import IUserExtended from '@/types/IUserContext';
import axios, { AxiosError } from 'axios';
import React, { ReactNode, createContext, useMemo } from 'react';
import useSWRImmutable from 'swr/immutable';

interface IProps {
  children: ReactNode;
}

interface IUserContext {
  user?: IUserExtended;
  error?: AxiosError;
  isLoading: boolean;
}

const fetcher = (url: string) =>
  axios
    .get(url, { withCredentials: true })
    .then((res) => res.data)
    .then((data) => {
      return { user: data?.user || null };
    });

export const UserContext = createContext<IUserContext>({ isLoading: true });

function UserProvider({ children }: IProps) {
  const { data, error } = useSWRImmutable('/api/user', fetcher);
  const user = data?.user;
  const isLoading = !(data || error);

  const value = useMemo(
    () => ({
      user,
      error,
      isLoading,
    }),
    [user, error, isLoading]
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
