import dbConnect from '@/lib/dbconnect';
import Subscription from '@/model/Subscription';
import Transaction from '@/model/Transaction';
import User, { IUser } from '@/model/User';
import { ConvertBalance } from '@/utils/money';
import axios from 'axios';
import { Inngest } from 'inngest';
import moment from 'moment';

const inngest = new Inngest({ name: 'Family Dashboard' });

export default inngest.createFunction(
  { name: 'Auto payment' },
  { cron: '0 0 * * *' },

  async () => {
    await dbConnect();
    const now = new Date();
    now.setUTCHours(0, 0, 0, 0);

    const users: IUser[] = await User.find().populate('subscriptions');
    if (!users) {
      return;
    }

    await Promise.all(
      users.map(async (user) => {
        user.subscriptions.map(async (sub) => {
          if (new Date(sub.date).getTime() === now.getTime()) {
            const transaction = new Transaction({
              title: `Оплата підписки ${sub.title}`,
              suma: -sub.cost,
              date: new Date(),
            });
            await transaction.save();
            user.balance -= sub.cost;
            user.transactions.push(transaction);
            if (user.telegram) {
              const data = {
                chat_id: user.telegram,
                text: `✅ <b>ОПЛАТА ПІДПИСКИ</b>\n🔖 Назва підписки: <i>${
                  sub.title
                }</i>\n💰 Сумма щомісячного платежу: <i>${ConvertBalance(
                  sub.cost
                )}</i>\n💳 Залишок на рахунку: <i>${ConvertBalance(
                  user.balance
                )}</i>\n\n<i>P.S.  Дякуємо, що користуєтесь нашими послугами🥰</i>`,
                parse_mode: 'HTML',
              };
              await axios.post(
                `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_TOKEN}/sendMessage`,
                data
              );
            }
          }
        });
        await user.save();
      })
    );

    const subs = await Subscription.find();

    await Promise.all(
      subs.map(async (sub) => {
        if (new Date(sub.date).getTime() === now.getTime()) {
          sub.date = moment(sub.date).utc().add(1, 'month').toISOString();
          await sub.save();
        }
      })
    );
  }
);
