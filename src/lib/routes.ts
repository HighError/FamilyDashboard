export interface IRoutes {
  path: RegExp;
  title: string;
  subTitle: string;
}

export const routes: IRoutes[] = [
  {
    path: new RegExp('^/$'),
    title: 'Огляд',
    subTitle: 'З поверненням',
  },
  {
    path: new RegExp('^/subscriptions$'),
    title: 'Підписки',
    subTitle: 'Ваші підписки',
  },
  {
    path: new RegExp('^/transactions$'),
    title: 'Транзакції',
    subTitle: 'Ваші транзакції',
  },
  {
    path: new RegExp('^/profile$'),
    title: 'Профіль',
    subTitle: 'Ваш профіль',
  },
  {
    path: new RegExp('^/admin/subscriptions$'),
    title: 'Підписки',
    subTitle: 'Керування підписками',
  },
  {
    path: new RegExp('^/admin/users$'),
    title: 'Користувачі',
    subTitle: 'Керування користувачами',
  },
  {
    path: new RegExp('^/admin/users/.*$'),
    title: 'Профіль',
    subTitle: 'Керування користувачем',
  },
];
