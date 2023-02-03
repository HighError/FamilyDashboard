import useWindowDimensions from '@/hooks/useWindowDimensions';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface IProps {
  children: ReactNode;
}

interface ISidebarProvider {
  showSidebar: boolean;
  updateShowSidebar: (value: boolean) => void;
}

export const SidebarContent = createContext<ISidebarProvider>({
  showSidebar: true,
  updateShowSidebar: () => {
    return;
  },
});

function SidebarProvider({ children }: IProps) {
  const { width } = useWindowDimensions();
  const [showSidebar, setShowSidebar] = useState<boolean>(width >= 1024);

  function updateShowSidebar(show: boolean): void {
    setShowSidebar(show || width >= 1024);
  }

  useEffect(() => {
    setShowSidebar(width >= 1024.0);
  }, [width]);

  return (
    <SidebarContent.Provider value={{ showSidebar, updateShowSidebar }}>
      {children}
    </SidebarContent.Provider>
  );
}

export default SidebarProvider;
