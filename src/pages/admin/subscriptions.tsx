import axios from 'axios';
import Icons from '../../components/Icons';
import CreateSubModal from '../../components/modals/CreateSubModal';
import DeleteSubModal from '../../components/modals/DeleteSubModal';
import EditSubModal from '../../components/modals/EditSubModal';
import Shimmer from '../../components/Shimmer';
import ShowErrorMessage from '../../utils/errorCode';
import { ISubscription } from '../../model/Subscription';
import { ModalType } from '../../types/Modal';
import { GetForamtedData } from '../../utils/date';
import { ConvertBalance } from '../../utils/money';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
function AdminSubscriptions() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ISubscription[]>([]);
  const [modal, setModal] = useState<ModalType>({
    modal: null,
    data: null,
  });

  async function UpdateData() {
    setIsLoading(true);
    try {
      const res = await axios.get('/api/subs');
      setData(res.data);
    } catch (err) {
      ShowErrorMessage(err);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    UpdateData();
  }, []);
  return (
    <div>
      <CreateSubModal
        isOpen={modal.modal == 'create'}
        setIsOpen={setModal}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        updateData={UpdateData}
      />
      <EditSubModal
        isOpen={modal.modal == 'edit'}
        setIsOpen={setModal}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        sub={modal.data as ISubscription}
        updateData={UpdateData}
      />
      <DeleteSubModal
        isOpen={modal.modal == 'delete'}
        setIsOpen={setModal}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        sub={modal.data as ISubscription}
        updateData={UpdateData}
      />
      <div className="flex flex-row items-center justify-between mb-2">
        <div>Всього підписок: {isLoading ? <Shimmer /> : data.length}</div>
        <button
          className="bg-primary-100 hover:bg-primary-150 disabled:bg-gray-100 duration-300 px-3 py-2 rounded-lg"
          type="button"
          disabled={isLoading}
          onClick={() => {
            setModal({
              modal: 'create',
              data: null,
            });
          }}
        >
          Додати
        </button>
      </div>
      <div className="relative overflow-x-auto select-none mb-24 rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Іконка
              </th>
              <th scope="col" className="px-6 py-3">
                Назва підписки
              </th>
              <th scope="col" className="px-6 py-3">
                Ціна
              </th>
              <th scope="col" className="px-6 py-3">
                Дата наступної оплати
              </th>
              <th scope="col" className="px-6 py-3">
                Змінити
              </th>
              <th scope="col" className="px-6 py-3">
                Видалити
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr key={e._id} className="bg-gray-200/75">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  {e._id}
                </th>
                <td className="px-6 py-4 text-2xl">
                  {<Icons icon={e.icon} />}
                </td>
                <td className="px-6 py-4">{e.title}</td>
                <td className="px-6 py-4 ">{ConvertBalance(e.cost)}</td>
                <td className="px-6 py-4 ">
                  {GetForamtedData(new Date(e.date))}
                </td>
                <td className="px-6 py-4">
                  <button
                    disabled={isLoading}
                    type="button"
                    onClick={() => {
                      setModal({
                        modal: 'edit',
                        data: e,
                      });
                    }}
                    className="bg-primary-100 hover:bg-primary-150 disabled:bg-gray-100 duration-300 px-3 py-2 rounded-lg"
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    disabled={isLoading}
                    type="button"
                    onClick={() => {
                      setModal({
                        modal: 'delete',
                        data: e,
                      });
                    }}
                    className="bg-red hover:bg-orange disabled:bg-gray-100 duration-300 px-3 py-2 rounded-lg"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminSubscriptions;
