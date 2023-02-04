import { UserContext } from '@/context/UserContext';
import React, { useContext, useState } from 'react';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalType } from '@/types/Modal';
import BalanceModal from '../modals/BalanceModal';
import { ConvertBalance } from '@/utils/money';

function Balance() {
  const { user } = useContext(UserContext);
  const [modal, setModal] = useState<ModalType>({
    modal: null,
    data: null,
  });

  if (!user) {
    return <></>;
  }

  return (
    <div>
      <BalanceModal isOpen={modal.modal === 'balance'} setIsOpen={setModal} />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col bg-gray-200 rounded-xl gap-2 px-4 py-6">
          <div className="flex flex-row gap-2 items-center">
            <div className="px-3 py-2 bg-gray-300 text-xl rounded-xl text-primary-150">
              <FontAwesomeIcon icon={faWallet} />
            </div>
            <div className="text-sm text-gray-400">Баланс</div>
          </div>
          <div
            className={`text-2xl tablet:text-2xl laptop:text-2xl desktop:text-3xl ${
              user.balance < 0 ? 'text-red' : 'text-white'
            }`}
          >
            {ConvertBalance(user.balance)}
          </div>
        </div>
        <button
          type="button"
          className="flex items-center justify-center rounded-lg bg-primary-100 hover:bg-primary-200 duration-300 py-2 px-4 cursor-pointer select-none"
          onClick={() => setModal({ modal: 'balance', data: null })}
        >
          Поповнити баланс
        </button>
      </div>
    </div>
  );
}

export default Balance;
