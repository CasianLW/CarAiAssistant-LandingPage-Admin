export interface User {
  username: string;
  userId: string;
  roles: string[];
  email: string;
  isBanned: boolean;
  isPremium: boolean;
}
