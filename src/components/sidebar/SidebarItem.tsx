import { SidebarContent } from '@/context/SidebarContext';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useContext } from 'react';

interface IProps {
  icon: IconProp;
  title: string;
  route: string;
}

function Sidebar({ icon, title, route }: IProps) {
  const { updateShowSidebar } = useContext(SidebarContent);
  const { asPath } = useRouter();
  const router = useRouter();
  const active: boolean = asPath === route;
  return (
    <div
      role="menuitem"
      aria-hidden="true"
      className={`flex flex-row gap-2 items-center duration-300 w-full rounded-lg py-3 px-4 cursor-pointer select-none hover:bg-primary-150 ${
        active ? 'bg-primary-200' : 'bg-primary-100'
      }`}
      onClick={() => {
        updateShowSidebar(false);
        router.replace(route);
      }}
    >
      <div className="text-xl">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="text-lg">{title}</div>
    </div>
  );
}

export default Sidebar;
