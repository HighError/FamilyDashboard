import { IUser } from '@/model/User';
import { ModalType } from '@/types/Modal';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, SetStateAction, useState } from 'react';
import EditPaymentLink from '../modals/EditPaymentLink';

interface IProps {
  user: IUser;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  updateData: () => Promise<void>;
}

function PaymentLink({ user, isLoading, setIsLoading, updateData }: IProps) {
  const [modal, setModal] = useState<ModalType>({
    modal: null,
    data: null,
  });
  return (
    <div>
      <EditPaymentLink
        isOpen={modal.modal === 'payment'}
        setIsOpen={setModal}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        user={user}
        updateData={updateData}
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col bg-gray-200 rounded-xl gap-2 px-4 py-6">
          <div className="flex flex-row gap-2 items-center ">
            <div className="p-2 bg-gray-300 text-xl rounded-xl text-primary-150 overflow-hidden">
              <FontAwesomeIcon icon={faLink} />
            </div>
            <div className="text-sm text-gray-400">Посилання для оплати</div>
          </div>
          <div
            className={`pt-3 truncate ${
              user.balance < 0 ? 'text-red' : 'text-white'
            }`}
          >
            {user.paymentLink ?? 'Посилання відсутнє'}
          </div>
        </div>
        <button
          type="button"
          className="flex items-center justify-center rounded-lg bg-primary-100 hover:bg-primary-200 duration-300 py-2 px-4 cursor-pointer select-none"
          onClick={() =>
            setModal({
              modal: 'payment',
              data: null,
            })
          }
        >
          Змінити посилання
        </button>
      </div>
    </div>
  );
}

export default PaymentLink;
