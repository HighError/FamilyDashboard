import { UserContext } from '@/contexts/UserContext';
import { ModalType } from '@/types/Modal';
import ShowErrorMessage from '@/utils/errorCode';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useContext } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import BaseModal from '../BaseModal';

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<ModalType>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  userID: string;
  transactionID?: string;
  updateData: () => Promise<void>;
}

function DeleteTransactionModal({
  isOpen,
  setIsOpen,
  isLoading,
  setIsLoading,
  transactionID,
  userID,
  updateData,
}: IProps) {
  const { user } = useContext(UserContext);

  async function remove() {
    try {
      setIsLoading(true);
      await axios.delete('/api/transactions', {
        data: { transactionID: transactionID, userID: userID },
      });
      toast.success('Транзакцію успішно видалено');
      if (user?._id.toString() === userID) {
        await mutate('/api/user');
      }
      await updateData();
      setIsOpen({
        modal: null,
        data: null,
      });
    } catch (err) {
      ShowErrorMessage(err);
    }
    setIsLoading(false);
  }

  if (!user) {
    return <></>;
  }

  return (
    <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading}>
      <div className="flex flex-col">
        <div className="text-2xl font-semibold mb-5">Видалення транзакції</div>
        <div className="mb-3">Ви дійсно хочете видалити транзакцію?</div>
        <div className="flex flex-row items-center justify-between mt-5">
          <button
            type="button"
            disabled={isLoading}
            onClick={() =>
              setIsOpen({
                modal: null,
                data: null,
              })
            }
            className="bg-red hover:bg-orange disabled:bg-gray-100 duration-300 px-3 py-2 rounded-lg"
          >
            Скасувати
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => remove()}
            className="bg-primary-100 hover:bg-primary-150 disabled:bg-gray-100 duration-300 px-3 py-2 rounded-lg"
          >
            Видалити
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

export default DeleteTransactionModal;
