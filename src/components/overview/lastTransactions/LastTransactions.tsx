import { UserContext } from '@/contexts/UserContext';
import { ITransaction } from '@/model/Transaction';
import { useState, useEffect, useContext, useCallback } from 'react';
import LastTransactionsItems from './LastTransactionsItems';

function LastTransactions() {
  const [data, setData] = useState<ITransaction[]>();
  const { user } = useContext(UserContext);

  const getData = useCallback((): void => {
    if (!user || !user.transactions || !Array.isArray(user.transactions)) {
      return;
    }
    const tempData: ITransaction[] = [...user.transactions];
    tempData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    });
    if (tempData.length > 5) {
      tempData.length = 5;
    }
    setData(tempData);
  }, [user]);

  useEffect(() => {
    getData();
  }, [user, getData]);
  return (
    <div>
      <div className="text-2xl pb-2 w-full border-b-2 border-b-gray-200 mb-2">
        Останні транзакції
      </div>
      <div>
        {data?.length === 0 ? (
          <div>Транзакції відсутні</div>
        ) : (
          data?.map((e) => (
            <LastTransactionsItems
              key={e._id}
              title={e.title}
              date={e.date}
              suma={e.suma}
            />
          )) ?? <div />
        )}
      </div>
    </div>
  );
}

export default LastTransactions;
