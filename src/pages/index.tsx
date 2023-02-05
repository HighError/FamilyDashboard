import Balance from '@/components/overview/Balance';
import Chart from '@/components/overview/Chart';
import LastTransactions from '@/components/overview/lastTransactions/LastTransactions';
import Telegram from '@/components/overview/Telegram';
import { getSession, GetSessionParams } from 'next-auth/react';

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

export default function Overview() {
  return (
    <div className="flex flex-col w-full gap-3 justify-center">
      <div className="flex flex-col tablet:grid tablet:grid-cols-3 gap-5">
        <Balance />
        <Chart />
        <Telegram />
      </div>
      <LastTransactions />
    </div>
  );
}
