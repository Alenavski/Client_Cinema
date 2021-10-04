import { Roles } from './constants/roles';

export interface UserModel {
  token: string,
  id: number,
  role: Roles
}
