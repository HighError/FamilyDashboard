import { UserContext } from '@/context/UserContext';
import { ModalType } from '@/types/Modal';
import ShowErrorMessage from '@/utils/errorCode';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { Dispatch, SetStateAction, useContext } from 'react';
import { toast } from 'react-toastify';
import BaseModal from '../BaseModal';

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<ModalType>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  userID: string;
  updateData: () => Promise<void>;
}

function AddTransactionModal({
  isOpen,
  setIsOpen,
  isLoading,
  setIsLoading,
  userID,
  updateData,
}: IProps) {
  const { user, updateUser } = useContext(UserContext);
  const form = useFormik({
    initialValues: {
      title: '',
      suma: 0,
      date: '',
      icon: 'default',
      changeBalance: true,
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      const data = {
        data: {
          title: values.title,
          suma: values.suma * 100,
          date: new Date(values.date).toUTCString(),
          icon: values.icon,
        },
        userID: userID,
        changeBalance: values.changeBalance,
      };

      try {
        await axios.post('/api/transactions', data);
        toast.success('Транзакція додана користувачу');

        if (user?._id === userID) {
          await updateUser();
        }

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

  return (
    <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading}>
      <div className="flex flex-col">
        <div className="text-2xl font-semibold mb-5">Додавання підписки</div>
        <form className="flex flex-col gap-3" onSubmit={form.handleSubmit}>
          <label
            htmlFor="title"
            className="flex flex-col tablet:flex-row gap-1 tablet:gap-3 items-start tablet:items-center justify-between"
          >
            Опис:
            <input
              id="title"
              name="title"
              onChange={form.handleChange}
              value={form.values.title}
              required
              minLength={3}
              className="bg-gray-200 rounded-lg mb-[1px border border-gray-300 duration-300 focus-within:border-primary-100 outline-none focus:outline-none pr-6 pl-3 py-3 caret-white"
            />
          </label>
          <label
            htmlFor="suma"
            className="flex flex-col tablet:flex-row gap-1 tablet:gap-3 items-start tablet:items-center justify-between"
          >
            Сума:
            <input
              id="suma"
              name="suma"
              value={form.values.suma}
              onChange={form.handleChange}
              type="number"
              step={0.01}
              placeholder="Сума в гривнях"
              required
              className="bg-gray-200 rounded-lg mb-[1px border border-gray-300 duration-300 focus-within:border-primary-100 outline-none focus:outline-none pr-6 pl-3 py-3 caret-white"
            />
          </label>
          <label
            htmlFor="date"
            className="flex flex-col tablet:flex-row gap-1 tablet:gap-3 items-start tablet:items-center justify-between"
          >
            <div className="text-sm tablet:text-base">Дата:</div>
            <input
              id="date"
              name="date"
              value={form.values.date}
              onChange={form.handleChange}
              type="datetime-local"
              required
              className="bg-gray-200 rounded-lg mb-[1px border border-gray-300 duration-300 focus-within:border-primary-100 outline-none focus:outline-none pr-6 pl-3 py-3 caret-white"
            />
          </label>
          <label
            htmlFor="icon"
            className="flex flex-col tablet:flex-row gap-1 tablet:gap-3 items-start tablet:items-center justify-between"
          >
            Іконка:
            <select
              id="icon"
              name="icon"
              value={form.values.icon}
              onChange={form.handleChange}
              required
              className="bg-gray-200 rounded-lg mb-[1px border border-gray-300 duration-300 focus-within:border-primary-100 outline-none focus:outline-none pr-6 pl-3 py-3 caret-white"
            >
              <option value="default">Default</option>
              <option value="youtube">Youtube</option>
              <option value="spotify">Spotify</option>
            </select>
          </label>
          <label
            htmlFor="icon"
            className="flex flex-row gap-3 items-center justify-between"
          >
            Змінити баланс?:
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-5 h-5 rounded accent-primary-100"
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
              Створити
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}

export default AddTransactionModal;
