import Image from 'next/image';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, SetStateAction, useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';
import md5 from 'md5';

interface IProps {
  title: string;
  subtitle: string;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

function Header({ title, subtitle, setShowSidebar }: IProps) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <></>;
  }
  return (
    <div className="flex flex-col mb-5 justify-center tablet:flex-row tablet:justify-between">
      <div className="flex flex-row items-center gap-6 mb-3 tablet:mb-0">
        <button
          type="button"
          className="bg-primary-100 hover:bg-primary-200 duration-300 px-3 py-2 rounded-xl cursor-pointer select-none laptop:hidden"
          onClick={() => setShowSidebar(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="flex flex-col justify-center gap-1">
          <div className="text-4xl font-semibold">{title}</div>
          <div className="text-sm text-gray-400">{subtitle}</div>
        </div>
      </div>
      <div className="bg-gray-200 px-4 py-3 flex flex-row items-center justify-between tablet:justify-center rounded-xl">
        <Image
          src={`https://www.gravatar.com/avatar/${md5(user.email)}`}
          alt="avatar"
          width={48}
          height={48}
          className="rounded-full w-12 h-12 mr-4"
        />
        <div>{user.username}</div>
        {/* <div
          role="menuitem"
          className="text-xl p-2 hover:text-primary-200 duration-300 cursor-pointer ml-2"
          onClick={() => logout()}
          aria-hidden="true"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div> */}
      </div>
    </div>
  );
}

export default Header;
