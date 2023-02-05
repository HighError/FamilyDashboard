import { ModalType } from '@/types/Modal';
import React, { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<ModalType>>;
  isLoading?: boolean;
  children: ReactNode;
}

function BaseModal({ isOpen, setIsOpen, isLoading, children }: IProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  if (!isOpen) {
    return <div />;
  }

  return (
    <div
      className="z-[49] flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-gray-100/90 overscroll-none"
      aria-hidden="true"
      role="menuitem"
      onClick={(e) => {
        if (e.currentTarget === e.target && !isLoading) {
          setIsOpen({
            modal: null,
            data: null,
          });
        }
      }}
    >
      <div className="z-50 bg-gray-200 rounded-md px-5 py-4 mx-2 my-3">
        {children}
      </div>
    </div>
  );
}

export default BaseModal;
