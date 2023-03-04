import AdminUser from '@/components/AdminUser';
import IUserExtended from '@/types/IUserContext';
import ShowErrorMessage from '@/utils/errorCode';
import axios from 'axios';
import { useEffect, useState } from 'react';

function AdminUsers() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IUserExtended[]>([]);

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
        <AdminUser
          key={e._id.toString()}
          id={e._id.toString()}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}

export default AdminUsers;
