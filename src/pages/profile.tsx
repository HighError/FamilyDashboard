import { UserContext } from '@/context/UserContext';
import { ModalType } from '@/types/Modal';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import md5 from 'md5';
import axios from 'axios';
import ShowErrorMessage from '@/utils/errorCode';
import Image from 'next/image';
import { getSession, GetSessionParams } from 'next-auth/react';

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

function Profile() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalType>({
    modal: null,
    data: null,
  });

  const form = useFormik({
    initialValues: {
      oldPass: '',
      newPass: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);

      if (values.oldPass === values.newPass) {
        setIsLoading(false);
        return toast.error(
          'Новий пароль повинен відрізнятись від попереднього!'
        );
      }

      if (values.newPass.length < 8) {
        setIsLoading(false);
        return toast.error('Парот повинен містити мінімум 8 символів');
      }

      const data = {
        oldPass: values.oldPass,
        newPass: values.newPass,
      };

      try {
        const res = await axios.post('/api/user/pass', data);

        if (!res) {
          throw new Error();
        }

        toast.success('Пароль успішно змінено');
      } catch (err) {
        ShowErrorMessage(err);
      }

      setIsLoading(false);
    },
  });

  if (!user) {
    return <></>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:tablet:grid-cols-3 gap-3">
        <div>
          <div className="bg-gray-200 rounded-xl px-5 py-4">
            <div className="flex flex-row items-center justify-center gap-2">
              <Image
                src={`https://www.gravatar.com/avatar/${md5(user.email)}`}
                alt="avatar"
                width={80}
                height={80}
                className="rounded-full w-20 h-20 mr-4"
              />
              <div className="flex flex-col gap-1 justify-center">
                <div className="text-2xl font-bold">{user.username}</div>
                <div className="text-sm text-gray-400">{`Email: ${user.email}`}</div>
                <button
                  type="button"
                  className="bg-primary-100 hover:bg-primary-150 py-2 px-3 rounded-xl"
                  onClick={() => {
                    window.open('https://gravatar.com/');
                  }}
                >
                  Змінити аватар
                </button>
              </div>
            </div>
          </div>
        </div>
        <form
          className="bg-gray-200 rounded-xl px-5 py-4 items-center justify-center row-span-2"
          onSubmit={form.handleSubmit}
        >
          <div className="text-xl">Змінити пароль</div>
          <div className="my-3">
            <div className="bg-gray-200 rounded-lg border border-gray-300 duration-300 focus-within:border-primary-100 ">
              <input
                id="oldPass"
                name="oldPass"
                placeholder="Старий пароль"
                type="password"
                onChange={form.handleChange}
                value={form.values.oldPass}
                required
                className="bg-[transparent] outline-none focus:outline-none pr-6 pl-3 py-3 caret-white"
              />
            </div>
          </div>
          <div className="my-3">
            <div className="bg-gray-200 rounded-lg mb-[1px border border-gray-300 duration-300 focus-within:border-primary-100 ">
              <input
                id="newPass"
                name="newPass"
                placeholder="Новий пароль"
                type="password"
                onChange={form.handleChange}
                value={form.values.newPass}
                required
                className="bg-[transparent] outline-none focus:outline-none pr-6 pl-3 py-3 caret-white"
              />
            </div>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="flex w-full items-center justify-center bg-primary-100 hover:bg-primary-200 rounded-lg px-5 py-2.5 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed text-lg duration-300 mt-2 mb-4"
          >
            {isLoading ? 'Зміна пароля...' : 'Змінити пароль'}
          </button>
        </form>
        <div>
          <div className="bg-gray-200 rounded-xl px-5 py-4 items-center justify-center">
            <div className="text-xl">Видалення аккаунта</div>
            <button
              disabled={isLoading || true}
              onClick={() => setModal({ modal: 'delete', data: null })}
              type="button"
              className="flex w-full items-center justify-center bg-red hover:bg-orange rounded-lg px-5 py-2.5 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed text-lg duration-300 mt-2 mb-4"
            >
              (поки не доступно)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
