export interface IRoutes {
  path: string;
  title: string;
  subTitle: string;
}

export const routes: IRoutes[] = [
  {
    path: '/',
    title: 'Огляд',
    subTitle: 'З поверненням',
  },
  {
    path: '/subscriptions',
    title: 'Підписки',
    subTitle: 'Ваші підписки',
  },
  {
    path: '/transactions',
    title: 'Транзакції',
    subTitle: 'Ваші транзакції',
  },
  {
    path: '/profile',
    title: 'Профіль',
    subTitle: 'Ваш профіль',
  },
  {
    path: '/admin/subscriptions',
    title: 'Підписки',
    subTitle: 'Керування підписками',
  },
];
