import { UserContext } from '@/context/UserContext';
import { useContext, useState } from 'react';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import ShowErrorMessage from '@/utils/errorCode';
import TelegramUnlinkModal from '../modals/TelegramUnlinkModal';
import { ModalType } from '@/types/Modal';

function Telegram() {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState<ModalType>({
    modal: null,
    data: null,
  });

  function link() {
    setIsLoading(true);
    const windowReference = window.open();
    axios
      .post('/api/user/telegram/')
      .then((res) => {
        if (windowReference) {
          windowReference.location = `${process.env.NEXT_PUBLIC_TELEGRAM_URL}?start=${res.data}`;
        }
      })
      .catch((err) => {
        if (windowReference) {
          windowReference.close();
          ShowErrorMessage(err);
        }
      })
      .finally(() => setIsLoading(false));
  }

  if (!user) {
    return <></>;
  }

  return (
    <div>
      <TelegramUnlinkModal
        isOpen={modal.modal === 'unlink'}
        setIsOpen={setModal}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col bg-gray-200 rounded-xl gap-2 px-4 py-6">
          <div className="flex flex-row gap-2 items-center">
            <div className="py-2 px-3 bg-gray-300 text-xl rounded-xl text-[#229ED9]">
              <FontAwesomeIcon icon={faTelegram} />
            </div>
            <div className="text-sm text-gray-400">Телеграм</div>
          </div>
          <div className="text-2xl tablet:text-2xl laptop:text-2xl desktop:text-3xl">
            {user.telegram ? `ID: ${user.telegram}` : "Не під'єднано"}
          </div>
        </div>
        <button
          type="button"
          disabled={isLoading}
          className="flex items-center justify-center rounded-lg bg-primary-100 hover:bg-primary-200 disabled:bg-gray-200/75 duration-300 py-2 px-4 cursor-pointer disabled:cursor-not-allowed select-none"
          onClick={() =>
            user.telegram ? setModal({ modal: 'unlink', data: null }) : link()
          }
        >
          {user.telegram ? "Відв'язати" : "Прив'язати"}
        </button>
      </div>
    </div>
  );
}

export default Telegram;
