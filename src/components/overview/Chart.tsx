import { useContext } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import moment from 'moment';
import { UserContext } from '@/context/UserContext';
import 'moment/locale/uk';
import { ITransaction } from '@/model/Transaction';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

function getSum(
  data: ITransaction[],
  mon: number,
  year: number,
  positive: boolean
): number {
  const sumWithInitial = data
    .filter(
      (e) =>
        new Date(e.date).getMonth() === mon &&
        new Date(e.date).getFullYear() === year &&
        (positive ? e.suma > 0 : e.suma < 0)
    )
    .reduce((accumulator, currentValue) => accumulator + currentValue.suma, 0);

  return sumWithInitial / 100;
}

function getXAxisCategory() {
  moment.locale('uk');
  const data = [];
  for (let i = 0; i < 6; i += 1) {
    const date = moment().subtract(i, 'months');
    data.unshift({
      month: date.month(),
      year: date.year(),
      title:
        date.format('MMMM YYYY').charAt(0).toUpperCase() +
        date.format('MMMM YYYY').slice(1),
    });
  }
  return data;
}

function Chart() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <></>;
  }

  const series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
    {
      name: 'Витрати',
      data: getXAxisCategory().map(
        (e) => -getSum(user.transactions ?? [], e.month, e.year, false)
      ),
    },
    {
      name: 'Поповнення',
      data: getXAxisCategory().map((e) =>
        getSum(user.transactions, e.month, e.year, true)
      ),
    },
  ];
  const options: ApexOptions = {
    theme: {
      mode: 'dark',
      palette: 'palette2',
    },
    chart: {
      type: 'line',
      background: 'transparent',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: 'Поповнення та витрати',
      align: 'center',
    },
    grid: {
      row: {
        colors: ['transparent'],
        opacity: 1,
      },
    },
    xaxis: {
      type: 'category',
      categories: getXAxisCategory().map((e) => e.title),
      labels: {
        show: false,
      },
    },
  };

  return (
    <div className="flex flex-col bg-gray-200 rounded-xl items-center justify-center p-3 h-60 tablet:h-auto">
      {typeof window !== 'undefined' && (
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={'100%'}
          width={'100%'}
        />
      )}
    </div>
  );
}

export default Chart;
