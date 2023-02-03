import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './sidebar/Sidebar';

interface IProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

function Layout({ title, subtitle, children }: IProps) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-full py-2">
        <Sidebar />
      </div>
      <div className="laptop:ml-80 pl-3 laptop:pl-6 pr-3 gap-5 pb-5">
        <Header title={title} subtitle={subtitle} />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
