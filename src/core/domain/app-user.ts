export default interface AppUserData {
  userId: string;
  username?: string;
  fullName?: string;
  email?: string;
  accessToken: string;
  tokenValidity: string;
  refreshToken: string;
  refreshTokenValidity: string;
  roles: string[];
  permissions: string[];
}
