import { Roles } from '@models/roles';

export interface TokenModel {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': Roles,
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string,
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid': string
}
