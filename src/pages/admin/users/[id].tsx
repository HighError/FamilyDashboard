import PaymentLink from '@/components/admin/PaymentLink';
import Subs from '@/components/admin/Subs';
import Transactios from '@/components/admin/Transactions';
import UserBalance from '@/components/admin/UserBalance';
import { ITransaction } from '@/model/Transaction';
import { IUser } from '@/model/User';
import ShowErrorMessage from '@/utils/errorCode';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function AdminEditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IUser | undefined>(undefined);

  async function UpdateData() {
    setIsLoading(true);
    const notification = toast.loading('Завантаження данних...');
    try {
      const res = await axios.get(`/api/user/id/${id}`);
      toast.update(notification, {
        render: 'Дані загружені',
        type: 'success',
        isLoading: false,
      });

      res.data.transactions.sort((a: ITransaction, b: ITransaction) => {
        const dateA = +new Date(a.date);
        const dateB = +new Date(b.date);
        return dateB - dateA;
      });

      setData(res.data);

      setTimeout(() => {
        toast.dismiss(notification);
      }, 2000);
    } catch (err) {
      toast.dismiss(notification);
      ShowErrorMessage(err);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    UpdateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) {
    return <div />;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-5">
        <UserBalance
          user={data}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          updateData={UpdateData}
        />
        <PaymentLink
          user={data}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          updateData={UpdateData}
        />
      </div>
      <Subs
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        data={data?.subscriptions ?? []}
        userID={data._id.toString()}
        updateData={UpdateData}
      />
      <Transactios
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        data={data?.transactions ?? []}
        userID={data._id.toString()}
        updateData={UpdateData}
      />
    </div>
  );
}

export default AdminEditUser;
