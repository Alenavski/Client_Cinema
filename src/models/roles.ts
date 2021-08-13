export enum Roles{
  Admin = 'Admin',
  User = 'User'
}

export function GetRole(role: string): Roles {
  switch (role) {
    case 'User':
      return Roles.User;
    case 'Admin':
      return Roles.Admin;
    default:
      return Roles.User;
  }
}
