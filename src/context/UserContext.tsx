import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { signOut, useSession } from 'next-auth/react';
import axios, { AxiosError } from 'axios';
import { IUser } from '@/model/User';

interface IProps {
  children: ReactNode;
}

interface IUserContext {
  user?: IUser;
  isLoading: boolean;
}

export const UserContext = createContext<IUserContext>({ isLoading: true });

function UserProvider({ children }: IProps) {
  const { status } = useSession();
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateUser = useCallback(async () => {
    setIsLoading(true);
    if (status !== 'authenticated') {
      setUser(undefined);
    } else {
      try {
        const { data } = await axios.get('/api/user/');
        setUser(data);
      } catch (err) {
        if (
          err instanceof AxiosError &&
          err.response &&
          err.response.status === 401
        ) {
          signOut();
        }
      }
    }
    setIsLoading(false);
  }, [status]);

  useEffect(() => {
    updateUser();
  }, [status, updateUser]);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
