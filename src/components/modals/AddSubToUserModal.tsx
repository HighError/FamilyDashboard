import { UserContext } from '@/context/UserContext';
import { ISubscription } from '@/model/Subscription';
import { ModalType } from '@/types/Modal';
import ShowErrorMessage from '@/utils/errorCode';
import axios from 'axios';
import { useFormik } from 'formik';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
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

function AddSubToUserModal({
  isOpen,
  setIsOpen,
  isLoading,
  setIsLoading,
  userID,
  updateData,
}: IProps) {
  const [subs, setSubs] = useState<ISubscription[]>([]);
  const { user, updateUser } = useContext(UserContext);
  const form = useFormik({
    initialValues: {
      sub: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      const data = {
        userID: userID,
        subID: values.sub,
      };

      try {
        await axios.put('/api/user/sub', data);
        toast.success('Підписка додана користувачу');

        await updateData();
        if (user?._id === userID) {
          await updateUser();
        }
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

  const updateSub = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('/api/subs');
      setSubs(data);
    } catch (err) {
      ShowErrorMessage(err);
      setIsOpen({
        modal: null,
        data: null,
      });
    }
    setIsLoading(false);
  }, [setIsLoading, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      updateSub();
    }
  }, [isOpen, updateSub]);

  return (
    <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading}>
      <div className="flex flex-col">
        <div className="text-2xl font-semibold mb-5">Додавання підписки</div>
        <form className="flex flex-col gap-3" onSubmit={form.handleSubmit}>
          <label
            htmlFor="cost"
            className="flex flex-col tablet:flex-row gap-1 tablet:gap-3 items-start tablet:items-center justify-between"
          >
            Підписка:
            <select
              id="sub"
              name="sub"
              value={form.values.sub}
              onChange={form.handleChange}
              required
              className="bg-gray-200 rounded-lg border border-gray-300 duration-300 focus-within:border-primary-100 outline-none focus:outline-none pr-6 pl-3 py-3 caret-white"
            >
              <option value="">-</option>
              {subs.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.title}
                </option>
              ))}
            </select>
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
              Додати
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}

export default AddSubToUserModal;
