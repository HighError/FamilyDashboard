import { UserContext } from '@/contexts/UserContext';
import { ITransaction } from '@/model/Transaction';
import { useContext, useEffect, useState } from 'react';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetForamtedDataAndTime } from '@/utils/date';
import { ConvertTransactionSuma } from '@/utils/money';

function Transactions() {
  const [sorting, setSorting] = useState(1);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user || !user.transactions || !Array.isArray(user.transactions)) {
      return;
    }
    const temp: ITransaction[] = [...user.transactions];
    temp.sort((a, b) => {
      const dateA = +new Date(a.date);
      const dateB = +new Date(b.date);
      return (dateB - dateA) * sorting;
    });
    setTransactions(temp);
  }, [sorting, user]);

  if (
    !transactions ||
    !Array.isArray(transactions) ||
    transactions.length === 0
  ) {
    return (
      <div className="text-center text-2xl mt-10">
        У вас відсутні транзакції
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto rounded-lg select-none">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              Опис
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer hover:bg-gray-300 duration-300"
              onClick={() => setSorting(sorting * -1)}
            >
              <div className="flex flex-row items-center justify-between">
                <div>Дата</div>
                <div
                  className={`text-xl duration-300 ${
                    sorting === 1 ? 'rotate-180' : 'rotate-0'
                  }`}
                >
                  <FontAwesomeIcon icon={faArrowUp} />
                </div>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Сума
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((e) => (
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
                className={`px-6 py-4 ${e.suma > 0 ? 'text-lime' : 'text-red'}`}
              >
                {ConvertTransactionSuma(e.suma)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
