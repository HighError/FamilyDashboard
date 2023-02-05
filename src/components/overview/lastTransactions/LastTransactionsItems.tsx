import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { GetForamtedDataAndTime } from '@/utils/date';
import { ConvertTransactionSuma } from '@/utils/money';

interface IProps {
  title: string;
  date: string;
  suma: number;
}

function LastTransactionsItems({ title, date, suma }: IProps) {
  return (
    <div className="flex flex-row items-center justify-between py-2 gap-2">
      <div className="flex flex-row items-center gap-2">
        <div
          className={`bg-gray-200 flex items-center justify-center p-3 rounded-xl text-2xl ${
            suma ? 'text-lime' : 'text-red'
          }`}
        >
          <FontAwesomeIcon icon={suma >= 0 ? faPlus : faMinus} />
        </div>
        <div className="flex flex-col justify-between gap-2">
          <div className="tablet:text-lg leading-5">{title}</div>
          <div className="text-sm text-gray-400">
            {GetForamtedDataAndTime(new Date(date))}
          </div>
        </div>
      </div>
      <div className={suma > 0 ? 'text-lime' : 'text-red'}>
        {ConvertTransactionSuma(suma)}
      </div>
    </div>
  );
}

export default LastTransactionsItems;
