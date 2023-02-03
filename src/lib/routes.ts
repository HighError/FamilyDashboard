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
    path: '/transactions',
    title: 'Транзакції',
    subTitle: 'Ваші транзакції',
  },
];
