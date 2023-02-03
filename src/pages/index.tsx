import Layout from '@/components/Layout';
import Balance from '@/components/overview/Balance';
import Chart from '@/components/overview/Chart';
import LastTransactions from '@/components/overview/lastTransactions/LastTransactions';
import { UserContext } from '@/context/UserContext';
import { getSession, GetSessionParams } from 'next-auth/react';
import { useContext } from 'react';

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
    <Layout title="Огляд" subtitle={`З поверненням`}>
      <div className="flex flex-col w-full gap-3 justify-center">
        <div className="flex flex-col tablet:grid tablet:grid-cols-3 gap-5">
          <Balance />
          <Chart />
          {/* <Telegram /> */}
        </div>
        <LastTransactions />
      </div>
    </Layout>
  );
}
