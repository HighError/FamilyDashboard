import { IUser } from '@/model/User';
import { ModalType } from '@/types/Modal';
import ShowErrorMessage from '@/utils/errorCode';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import BaseModal from '../BaseModal';
import isURL from 'validator/lib/isURL';
import { UserContext } from '@/context/UserContext';

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<ModalType>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  user?: IUser;
  updateData: () => Promise<void>;
}

function EditPaymentLink({
  isOpen,
  setIsOpen,
  isLoading,
  setIsLoading,
  user,
  updateData,
}: IProps) {
  const userContext = useContext(UserContext);
  const form = useFormik({
    initialValues: {
      paymentLink: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);

      if (!isURL(values.paymentLink)) {
        setIsLoading(false);
        return toast.error('Ви повинні ввести посилання');
      }

      const data = {
        id: user?._id ?? '',
        paymentLink: values.paymentLink,
      };

      try {
        await axios.put('/api/user/payment-link', data);
        toast.success('Посилання для оплати успішно змінено');

        if (user?._id === userContext.user?._id) {
          await userContext.updateUser();
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

  useEffect(() => {
    form.resetForm();
    if (user) {
      form.values.paymentLink = user.paymentLink;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isOpen]);

  return (
    <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading}>
      <div className="flex flex-col">
        <div className="text-2xl font-semibold mb-5">Редагування оплати</div>
        <div className="mb-2 text-gray-400 text-sm">
          Попереднє посилання:
          <div>{user?.paymentLink ?? ''}</div>
        </div>
        <form className="flex flex-col gap-3" onSubmit={form.handleSubmit}>
          <label
            htmlFor="cost"
            className="flex flex-col tablet:flex-row gap-1 tablet:gap-3 items-start tablet:items-center justify-between"
          >
            Посилання:
            <input
              id="paymentLink"
              name="paymentLink"
              value={form.values.paymentLink}
              onChange={form.handleChange}
              required
              className="bg-gray-200 rounded-lg border border-gray-300 duration-300 focus-within:border-primary-100 outline-none focus:outline-none pr-6 pl-3 py-3 caret-white"
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

export default EditPaymentLink;
