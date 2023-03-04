import { ISubscription } from '@/model/Subscription';
import { ModalType } from '@/types/Modal';
import { GetDataForInput } from '@/utils/date';
import ShowErrorMessage from '@/utils/errorCode';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import BaseModal from '../BaseModal';

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<ModalType>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  sub?: ISubscription;
  updateData: () => Promise<void>;
}

function EditSubModal({
  isOpen,
  setIsOpen,
  isLoading,
  setIsLoading,
  sub,
  updateData,
}: IProps) {
  const form = useFormik({
    initialValues: {
      title: '',
      icon: 'Default',
      cost: 0,
      date: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      const data = {
        id: sub?._id ?? 0,
        data: {
          title: values.title,
          icon: values.icon,
          cost: values.cost * 100,
          date: values.date,
        },
      };

      try {
        await axios.put('/api/subs', data);
        toast.success('Підписка успішно оновлена');

        await mutate('/api/user');

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
    if (sub) {
      form.values.title = sub.title;
      form.values.icon = sub.icon;
      form.values.cost = sub.cost / 100;
      form.values.date = GetDataForInput(new Date(sub?.date));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sub]);

  return (
    <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading}>
      <div className="flex flex-col">
        <div className="text-2xl font-semibold mb-5">
          Редагування підписки {sub?.title ?? ''}
        </div>
        <form className="flex flex-col gap-3" onSubmit={form.handleSubmit}>
          <label
            htmlFor="title"
            className="flex flex-col tablet:flex-row gap-1 tablet:gap-3 items-start tablet:items-center justify-between"
          >
            Назва:
            <input
              id="title"
              name="title"
              onChange={form.handleChange}
              value={form.values.title}
              required
              minLength={3}
              className="bg-gray-200 rounded-lg border border-gray-300 duration-300 focus-within:border-primary-100 outline-none focus:outline-none pr-6 pl-3 py-3 caret-white"
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
              className="bg-gray-200 rounded-lg border border-gray-300 duration-300 focus-within:border-primary-100 outline-none focus:outline-none pr-6 pl-3 py-3 caret-white"
            >
              <option value="default">Default</option>
              <option value="youtube">Youtube</option>
              <option value="spotify">Spotify</option>
            </select>
          </label>
          <label
            htmlFor="cost"
            className="flex flex-col tablet:flex-row gap-1 tablet:gap-3 items-start tablet:items-center justify-between"
          >
            Ціна:
            <input
              id="cost"
              name="cost"
              value={form.values.cost}
              onChange={form.handleChange}
              type="number"
              min={0}
              step={0.01}
              placeholder="Ціна в гривнях"
              required
              className="bg-gray-200 rounded-lg border border-gray-300 duration-300 focus-within:border-primary-100 outline-none focus:outline-none pr-6 pl-3 py-3 caret-white"
            />
          </label>
          <label
            htmlFor="date"
            className="flex flex-col tablet:flex-row gap-1 tablet:gap-3 items-start tablet:items-center justify-between"
          >
            <div className="text-sm tablet:text-base">
              Дата наступного платежу:
            </div>
            <input
              id="date"
              name="date"
              value={form.values.date}
              onChange={form.handleChange}
              type="date"
              required
              className="bg-gray-200 rounded-lg border border-gray-300 duration-300 focus-within:border-primary-100 outline-none focus:outline-none pr-6 pl-3 py-3 caret-white"
            />
          </label>
          <div className="flex flex-col tablet:flex-row gap-1 tablet:gap-3 items-start tablet:items-center justify-between">
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
              Редагувати
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}

export default EditSubModal;
