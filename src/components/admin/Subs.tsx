import { ISubscription } from '@/model/Subscription';
import { ModalType } from '@/types/Modal';
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
import AddSubToUserModal from '../modals/AddSubToUserModal';
import DeleteSubUserModal from '../modals/DeleteSubUserModal';

interface IProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  data: ISubscription[];
  userID: string;
  updateData: () => Promise<void>;
}

function Subs({ isLoading, setIsLoading, data, userID, updateData }: IProps) {
  const [modal, setModal] = useState<ModalType>({
    modal: null,
    data: null,
  });

  return (
    <div>
      <AddSubToUserModal
        isOpen={modal.modal === 'add'}
        setIsOpen={setModal}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        userID={userID}
        updateData={updateData}
      />
      <DeleteSubUserModal
        isOpen={modal.modal === 'delete'}
        setIsOpen={setModal}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        userID={userID}
        sub={(modal.data as ISubscription) ?? undefined}
        updateData={updateData}
      />
      <div>
        <Accordion allowZeroExpanded>
          <AccordionItem>
            <AccordionItemHeading>
              <AccordionItemButton>Підписки</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="min-w-full">
              <div className="flex flex-col items-start gap-3 mt-3 justify-between relative overflow-x-auto select-none rounded-lg">
                <button
                  className="bg-primary-100 hover:bg-primary-150 disabled:bg-gray-100 duration-300 px-3 py-2 rounded-lg"
                  type="button"
                  onClick={() =>
                    setModal({
                      modal: 'add',
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
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Назва
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Видалити
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((e) => (
                        <tr
                          key={Math.random().toString(16).slice(2)}
                          className="bg-gray-200/75"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium whitespace-nowrap"
                          >
                            {e._id}
                          </th>
                          <td className="px-6 py-4">{e.title}</td>
                          <td className="px-6 py-4">
                            <button
                              disabled={isLoading}
                              type="button"
                              className="bg-red hover:bg-orange disabled:bg-gray-100 duration-300 px-3 py-2 rounded-lg"
                              onClick={() =>
                                setModal({
                                  modal: 'delete',
                                  data: e,
                                })
                              }
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

export default Subs;
