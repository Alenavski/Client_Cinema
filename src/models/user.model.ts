import { Roles } from './roles';

export interface UserModel {
  token: string,
  id: number,
  role: Roles
}
