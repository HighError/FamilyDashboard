import { createContext, ReactNode, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface IProps {
  children: ReactNode;
}

interface IUserContext {
  user?: string | null;
  //   setUser?: (value: UserType | null) => void;
}

export const UserContext = createContext<IUserContext>({});

function UserProvider({ children }: IProps) {
  const { status } = useSession();
  const [user, setUser] = useState<string | null>('');

  useEffect(() => {
    if (status !== 'authenticated') {
      setUser(null);
    } else {
      setUser('ok!');
    }
  }, [status]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
