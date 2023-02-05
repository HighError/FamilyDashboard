import { ITransaction } from '@/model/Transaction';
import { ModalType } from '@/types/Modal';
import { GetForamtedDataAndTime } from '@/utils/date';
import { ConvertTransactionSuma } from '@/utils/money';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import AddTransactionModal from '../modals/AddTransactionModal';
import DeleteTransactionModal from '../modals/DeleteTransactionModal';

interface IProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  data: ITransaction[];
  userID: string;
  updateData: () => Promise<void>;
}

function Transactios({
  isLoading,
  setIsLoading,
  data,
  userID,
  updateData,
}: IProps) {
  const [modal, setModal] = useState<ModalType>({
    modal: null,
    data: null,
  });
  return (
    <div>
      <AddTransactionModal
        isOpen={modal.modal === 'create'}
        setIsOpen={setModal}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        userID={userID}
        updateData={updateData}
      />
      <DeleteTransactionModal
        isOpen={modal.modal === 'delete'}
        setIsOpen={setModal}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        userID={userID}
        transactionID={(modal.data as string) ?? ''}
        updateData={updateData}
      />
      <div>
        <Accordion allowZeroExpanded>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Транзакції</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="min-w-full">
              <div className="flex flex-col items-start gap-3 mt-3 justify-between relative overflow-x-auto select-none rounded-lg">
                <button
                  className="bg-primary-100 hover:bg-primary-150 disabled:bg-gray-100 duration-300 px-3 py-2 rounded-lg"
                  type="button"
                  onClick={() =>
                    setModal({
                      modal: 'create',
                      data: null,
                    })
                  }
                >
                  Додати
                </button>
                <div className="min-w-full">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-200">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Опис
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Дата
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Сума
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
                            {e.title ?? '???'}
                          </th>
                          <td className="px-6 py-4">
                            {GetForamtedDataAndTime(new Date(e.date))}
                          </td>
                          <td
                            className={`px-6 py-4 ${
                              e.suma > 0 ? 'text-lime' : 'text-red'
                            }`}
                          >
                            {ConvertTransactionSuma(e.suma)}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              disabled={isLoading}
                              type="button"
                              onClick={() => {
                                setModal({
                                  modal: 'delete',
                                  data: e._id,
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
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default Transactios;
