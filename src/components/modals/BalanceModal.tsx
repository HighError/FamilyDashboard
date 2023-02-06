import { UserContext } from '@/context/UserContext';
import { ModalType } from '@/types/Modal';
import React, { Dispatch, SetStateAction, useContext } from 'react';
import BaseModal from '../BaseModal';
import Shimmer from '../Shimmer';

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<ModalType>>;
  isLoading?: boolean;
}

function BalanceModal({ isOpen, setIsOpen, isLoading }: IProps) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <></>;
  }

  if (!user.paymentLink) {
    return (
      <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading}>
        <div className="flex flex-col">
          <div className="text-2xl font-semibold mb-5">Поповнення рахунку</div>
          <div>Нажаль адміністратор не налаштував вам оплату.</div>
          <div className="mb-3">
            Зверніться до адміністратора або спробуйте пізніше.
          </div>
        </div>
      </BaseModal>
    );
  }

  return (
    <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading}>
      <div className="flex flex-col">
        <div className="text-2xl font-semibold mb-5">Поповнення рахунку</div>
        <div className="mb-3">{`Для поповнення рахунку натисніть кнопку нижче і в поле коментар введіть цей ID: ${
          user._id ?? <Shimmer />
        }`}</div>
        <button
          className="px-3 py-2 bg-primary-100 hover:bg-primary-150 rounded-lg"
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(user._id).then(() => {
              window.open(user.paymentLink);
            });
          }}
        >
          Скопіювати ID та перейти
        </button>
      </div>
    </BaseModal>
  );
}

export default BalanceModal;
