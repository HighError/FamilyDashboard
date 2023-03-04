import Balance from '@/components/overview/Balance';
import Chart from '@/components/overview/Chart';
import LastTransactions from '@/components/overview/lastTransactions/LastTransactions';
import Telegram from '@/components/overview/Telegram';
import OnlyForAuth from '@/components/routesControllers/OnlyForAuth';

export default function Overview() {
  return (
    <OnlyForAuth>
      <div className="flex flex-col w-full gap-3 justify-center">
        <div className="flex flex-col tablet:grid tablet:grid-cols-3 gap-5">
          <Balance />
          <Chart />
          <Telegram />
        </div>
        <LastTransactions />
      </div>
    </OnlyForAuth>
  );
}
