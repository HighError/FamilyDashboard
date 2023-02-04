import UserBalance from '@/components/admin/UserBalance';
import { IUser } from '@/model/User';
import ShowErrorMessage from '@/utils/errorCode';
import axios from 'axios';
import { getSession, GetSessionParams } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

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
      setData(res.data);
      toast.update(notification, {
        render: 'Дані загружені',
        type: 'success',
        isLoading: false,
      });
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
    <div className="grid grid-cols-3 gap-5">
      <UserBalance
        user={data}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        updateData={UpdateData}
      />
    </div>
  );
}

export default AdminEditUser;
