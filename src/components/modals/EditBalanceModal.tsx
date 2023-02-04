import { IUser } from '@/model/User';
import { ModalType } from '@/types/Modal';
import ShowErrorMessage from '@/utils/errorCode';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';
import BaseModal from '../BaseModal';

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<ModalType>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  user?: IUser;
  updateData: () => Promise<void>;
}

function EditBalanceModal({
  isOpen,
  setIsOpen,
  isLoading,
  setIsLoading,
  user,
  updateData,
}: IProps) {
  const form = useFormik({
    initialValues: {
      balance: 0,
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      const data = {
        id: user?._id ?? '',
        balance: values.balance * 100,
      };

      try {
        await axios.put('/api/user/balance', data);
        toast.success('Баланс користувача успішно оновлений');

        await updateData();
        form.resetForm();
        setIsOpen({
          modal: null,
          data: null,
        });
      } catch (err) {
        ShowErrorMessage(err);
      }
      setIsLoading(false);
    },
  });

  useEffect(() => {
    form.resetForm();
    if (user) {
      form.values.balance = user.balance / 100;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isOpen]);

  return (
    <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading}>
      <div className="flex flex-col">
        <div className="text-2xl font-semibold mb-5">Редагування балансу</div>
        <form className="flex flex-col gap-3" onSubmit={form.handleSubmit}>
          <label
            htmlFor="cost"
            className="flex flex-row gap-3 items-center justify-between"
          >
            Ціна:
            <input
              id="balance"
              name="balance"
              value={form.values.balance}
              onChange={form.handleChange}
              type="number"
              min={0}
              step={0.01}
              placeholder="Ціна в гривнях"
              required
              className="bg-gray-200 rounded-lg mb-[1px border border-gray-300 duration-300 focus-within:border-primary-100 outline-none focus:outline-none pr-6 pl-3 py-3 caret-white"
            />
          </label>
          <div className="flex flex-row items-center justify-between mt-5">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => {
                form.resetForm();
                setIsOpen({
                  modal: null,
                  data: null,
                });
              }}
              className="bg-red hover:bg-orange disabled:bg-gray-100 duration-300 px-3 py-2 rounded-lg"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary-100 hover:bg-primary-150 disabled:bg-gray-100 duration-300 px-3 py-2 rounded-lg"
            >
              Змінити
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}

export default EditBalanceModal;
