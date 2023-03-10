import React, { useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';
import Subscription from '@/components/Subscription';

function Subscriptions() {
  const { user } = useContext(UserContext);

  if (
    !user ||
    !user.subscriptions ||
    !Array.isArray(user.subscriptions) ||
    user.subscriptions.length === 0
  ) {
    return (
      <div className="text-center text-2xl mt-10">У вас відсутні підписки</div>
    );
  }

  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4">
      {user.subscriptions.map((e) => (
        <Subscription
          key={(Math.random() + 1).toString(36).substring(7)}
          title={e.title}
          icon={e.icon}
          cost={e.cost}
          date={e.date}
        />
      ))}
    </div>
  );
}

export default Subscriptions;
