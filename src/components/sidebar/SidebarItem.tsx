import useWindowDimensions from '@/hooks/useWindowDimensions';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

interface IProps {
  icon: IconProp;
  title: string;
  route: string;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

function Sidebar({ icon, title, route, setShowSidebar }: IProps) {
  const { width } = useWindowDimensions();
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
        setShowSidebar(width >= 1024);
        router.push(route);
      }}
    >
      <div className="text-xl w-7 flex items-center justify-center">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="text-lg">{title}</div>
    </div>
  );
}

export default Sidebar;
