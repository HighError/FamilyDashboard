import React, { useEffect, useState } from 'react';
import md5 from 'md5';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';

interface IProps {
  id: string;
  isLoading: boolean;
}

function User({ id, isLoading }: IProps) {
  const route = useRouter();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_ID_URL ?? ''}/api/user/${id}`, {
        headers: {
          Authorization: `${process.env.NEXT_PUBLIC_API_KEY_ID}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setEmail(res.data.email);
        setUsername(res.data.username);
      })
      .catch(() => {
        toast.error(`Помилка завантаження користувача ${id}`);
      });
  }, []);

  return (
    <div className="bg-gray-200 rounded-lg flex flex-row items-center justify-between px-3 py-2 gap-2">
      <div className="flex items-center gap-2 overflow-hidden">
        <Image
          src={`https://www.gravatar.com/avatar/${md5(email ?? '0')}`}
          alt="avatar"
          width={80}
          height={80}
          className="rounded-full w-8 h-8 tablet:w-20 tablet:h-20"
        />
        <div className=" overflow-hidden">
          <div className="text-gray-400 text-[10px] tablet:text-xs truncate">
            {id}
          </div>
          <h2 className="text-lg tablet:text-xl truncate">{username}</h2>
          <div className="text-gray-400 text-[10px] tablet:text-xs truncate">
            {email}
          </div>
        </div>
      </div>

      <button
        className="bg-primary-100 hover:bg-primary-150 disabled:bg-gray-100 duration-300 px-2 py-1 rounded-lg"
        type="button"
        disabled={isLoading}
        onClick={() => route.push(`/admin/users/${id}`)}
      >
        <FontAwesomeIcon icon={faPen} />
      </button>
    </div>
  );
}

export default User;
