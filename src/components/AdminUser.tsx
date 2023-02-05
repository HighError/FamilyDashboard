import React from 'react';
import md5 from 'md5';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  id: string;
  name: string;
  email: string;
  isLoading: boolean;
}

function User({ id, name, email, isLoading }: IProps) {
  const route = useRouter();
  return (
    <div className="bg-gray-200 rounded-lg flex flex-row items-center justify-between px-3 py-2 gap-2">
      <div className="flex items-center gap-2 overflow-hidden">
        <Image
          src={`https://www.gravatar.com/avatar/${md5(email)}`}
          alt="avatar"
          width={80}
          height={80}
          className="rounded-full w-8 h-8 tablet:w-20 tablet:h-20"
        />
        <div className=" overflow-hidden">
          <div className="text-gray-400 text-[10px] tablet:text-xs truncate">
            {id}
          </div>
          <h2 className="text-lg tablet:text-xl truncate">{name}</h2>
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
