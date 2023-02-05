import { UserContext } from '@/context/UserContext';
import { ModalType } from '@/types/Modal';
import ShowErrorMessage from '@/utils/errorCode';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useContext } from 'react';
import { toast } from 'react-toastify';
import BaseModal from '../BaseModal';

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<ModalType>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

function TelegramUnlinkModal({
  isOpen,
  setIsOpen,
  isLoading,
  setIsLoading,
}: IProps) {
  const { user, updateUser } = useContext(UserContext);

  async function unlink() {
    try {
      setIsLoading(true);
      await axios.delete('/api/user/telegram');
      toast.success("Телеграм успішно відв'язано.");
      await updateUser();
    } catch (err) {
      setIsLoading(false);
      ShowErrorMessage(err);
    }
  }

  if (!user) {
    return <></>;
  }

  return (
    <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading}>
      <div className="flex flex-col">
        <div className="text-2xl font-semibold mb-5">Телеграм</div>
        <div className="mb-3">Ви дісйно хочете відв&apos;язати телеграм?</div>
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
            onClick={() => unlink()}
            className="bg-primary-100 hover:bg-primary-150 disabled:bg-gray-100 duration-300 px-3 py-2 rounded-lg"
          >
            Відв&apos;язати
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

export default TelegramUnlinkModal;
