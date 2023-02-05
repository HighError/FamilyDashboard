import React from 'react';
import { IconType } from '@/types/Icon';
import { GetForamtedData } from '@/utils/date';
import Icons from './Icons';

interface IProps {
  title: string;
  icon: IconType;
  cost: number;
  date: string;
}

function Subscription({ title, icon, cost, date }: IProps) {
  return (
    <div className="bg-gray-200 rounded-lg p-3">
      <div className="flex flex-row text-2xl mb-5 items-center gap-2">
        <div className=" bg-gray-300 p-2 rounded-lg">
          <Icons icon={icon} />
        </div>
        <div>{title}</div>
      </div>
      <div>{`Дата оплати: ${GetForamtedData(new Date(date))}`}</div>
      <div className="text-right text-2xl text-lime mt-3">
        {new Intl.NumberFormat('ukr-UA', {
          style: 'currency',
          currency: 'UAH',
        }).format(cost / 100)}
        /місяць
      </div>
    </div>
  );
}

export default Subscription;
