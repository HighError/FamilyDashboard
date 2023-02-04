import AdminUser from '@/components/AdminUser';
import { IUser } from '@/model/User';
import { ModalType } from '@/types/Modal';
import ShowErrorMessage from '@/utils/errorCode';
import axios from 'axios';
import { getSession, GetSessionParams } from 'next-auth/react';
import { useEffect, useState } from 'react';

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

function AdminUsers() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IUser[]>([]);
  const [modal, setModal] = useState<ModalType>({
    modal: null,
    data: null,
  });

  async function UpdateData() {
    setIsLoading(true);
    try {
      const res = await axios.get('/api/users');
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
    <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-3">
      {data.map((e) => (
        <AdminUser key={e._id} id={e._id} name={e.username} email={e.email} />
      ))}
    </div>
  );
}

export default AdminUsers;
