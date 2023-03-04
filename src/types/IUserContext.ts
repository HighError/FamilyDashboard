import { IUser } from '@/model/User';

export default interface IUserExtended extends IUser {
  username: string;
  email: string;
}
