import { Dispatch, SetStateAction, useContext } from 'react';
import {
  faFileSignature,
  faUserPen,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTableColumns,
  faMoneyBillTransfer,
  faFileInvoiceDollar,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import SidebarItem from './SidebarItem';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { UserContext } from '@/context/UserContext';

interface IProps {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

function Sidebar({ showSidebar, setShowSidebar }: IProps) {
  const { width } = useWindowDimensions();
  const { user } = useContext(UserContext);
  return (
    <div>
      <div
        className={`flex flex-col items-center left-0 top-0 bottom-0 w-80 bg-gray-200 px-3 pt-4 fixed z-30 ease-in-out duration-300 border-r border-r-gray-300
        ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-row justify-between items-center gap-2 pb-8">
            <h1 className="text-3xl font-bold">Family Dashboard</h1>
            <button
              type="button"
              className="bg-primary-100 hover:bg-primary-200 duration-300 px-3 py-2 text-sm rounded-md cursor-pointer select-none laptop:hidden"
              onClick={() => setShowSidebar(width >= 1024)}
            >
              <div>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </button>
          </div>
          <div className="flex flex-col items-center w-full gap-4 laptop:gap-2">
            <SidebarItem
              icon={faTableColumns}
              title="Огляд"
              route="/"
              setShowSidebar={setShowSidebar}
            />
            <SidebarItem
              icon={faFileInvoiceDollar}
              title="Підписки"
              route="/subscriptions"
              setShowSidebar={setShowSidebar}
            />
            <SidebarItem
              icon={faMoneyBillTransfer}
              title="Транзакції"
              route="/transactions"
              setShowSidebar={setShowSidebar}
            />
            <SidebarItem
              icon={faUser}
              title="Профіль"
              route="/profile"
              setShowSidebar={setShowSidebar}
            />
            {user?.role === 'admin' && (
              <div className="flex flex-col items-center w-full mt-8 gap-4 laptop:gap-2">
                <div className="text-2xl font-semibold">Адмін панель</div>
                <SidebarItem
                  icon={faFileSignature}
                  title="Підписки"
                  route="/admin/subscriptions"
                  setShowSidebar={setShowSidebar}
                />
                <SidebarItem
                  icon={faUserPen}
                  title="Користувачі"
                  route="/admin/users"
                  setShowSidebar={setShowSidebar}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        role="menuitem"
        className={`fixed top-0 bottom-0 left-0 right-0 z-20 bg-gray-100 laptop:hidden duration-300 ${
          showSidebar ? 'opacity-90' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowSidebar(width >= 1024)}
        aria-hidden="true"
      />
    </div>
  );
}

export default Sidebar;
