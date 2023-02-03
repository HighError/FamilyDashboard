import { SidebarContent } from '@/context/SidebarContext';
import { useContext, useEffect, useState } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTableColumns,
  faMoneyBillTransfer,
  faFileInvoiceDollar,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import SidebarItem from './SidebarItem';

function Sidebar() {
  const context = useContext(SidebarContent);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (!window) {
      setShowSidebar(false);
    } else {
      setShowSidebar(context.showSidebar);
    }
  }, [context.showSidebar]);
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
              onClick={() => context.updateShowSidebar(false)}
            >
              <div>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </button>
          </div>
          <div className="flex flex-col items-center w-full gap-4 laptop:gap-2">
            <SidebarItem icon={faTableColumns} title="Огляд" route="/" />
            <SidebarItem
              icon={faFileInvoiceDollar}
              title="Підписки"
              route="/subscriptions"
            />
            <SidebarItem
              icon={faMoneyBillTransfer}
              title="Транзакції"
              route="/transactions"
            />
            <SidebarItem icon={faUser} title="Профіль" route="/profile" />
            {/* {profile?.role === 'admin' && (
              <div className="flex flex-col items-center w-full gap-2">
                <div className="bg-gray-100/75 w-full h-1 rounded-xl" />
                <div className="text-2xl font-semibold">Адмін панель</div>
                <SidebarItem
                  icon={<RiBillLine />}
                  title="Підписки"
                  route="/admin/subs"
                />
                <SidebarItem
                  icon={<AiOutlineUser />}
                  title="Користувачі"
                  route="/admin/users"
                />
              </div>
            )} */}
          </div>
        </div>
      </div>
      <div
        role="menuitem"
        className={`fixed top-0 bottom-0 left-0 right-0 z-20 bg-gray-100 laptop:hidden duration-300 ${
          showSidebar ? 'opacity-90' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => context.updateShowSidebar(false)}
        aria-hidden="true"
      />
    </div>
  );
}

export default Sidebar;
