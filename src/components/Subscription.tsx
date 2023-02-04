import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getIcon from '@/utils/getIcon';
import { IconType } from '@/types/Icon';
import { GetForamtedData } from '@/utils/data';

interface IProps {
  title: string;
  icon: IconType;
  cost: number;
  date: Date;
}

function Subscription({ title, icon, cost, date }: IProps) {
  return (
    <div className="bg-gray-200 rounded-lg p-3">
      <div className="flex flex-row text-2xl mb-5 items-center gap-2">
        <div className="bg-gray-300 p-2 rounded-lg">
          <FontAwesomeIcon icon={getIcon(icon)} />
        </div>
        <div>{title}</div>
      </div>
      <div>{`Дата оплати: ${GetForamtedData(date)}`}</div>
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

Subscription.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

export default Subscription;