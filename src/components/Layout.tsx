import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import { Dispatch, ReactNode, SetStateAction, useContext } from 'react';
import Header from './Header';
import Loading from './Loading';
import Sidebar from './sidebar/Sidebar';

interface IProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

function Layout({
  title,
  subtitle,
  children,
  showSidebar,
  setShowSidebar,
}: IProps) {
  const router = useRouter();
  const { user, isLoading } = useContext(UserContext);
  if (isLoading) {
    return <Loading />;
  }
  if (!user) {
    router.replace('/login');
    return <div />;
  }
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-full py-2">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
      <div className="laptop:ml-80 pl-3 laptop:pl-6 pr-3 gap-5 pb-5">
        <Header
          title={title}
          subtitle={subtitle}
          setShowSidebar={setShowSidebar}
        />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
