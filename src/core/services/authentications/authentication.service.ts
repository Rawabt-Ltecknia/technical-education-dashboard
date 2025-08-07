import AppUserData from "@/core/domain/app-user";

export class AuthenticationService  {
  private readonly USER_KEY = 'APP_USER';

  async setAppUser(appUser: any): Promise<AppUserData> {
    const userForSave=JSON.stringify(appUser);
    localStorage.removeItem(this.USER_KEY);
    localStorage.setItem(this.USER_KEY, userForSave);
    return JSON.parse(userForSave);
  }

    async logout(): Promise<void> {
      localStorage.removeItem(this.USER_KEY);
    }

  get user(): Promise<AppUserData | null> {
    const user = localStorage.getItem(this.USER_KEY);
    if (user) {
      return Promise.resolve(JSON.parse(user));
    }
    return Promise.resolve(null);
  }

  async getAccessToken(): Promise<string | null> {
    const user =await this.user;
    if (!user) return Promise.resolve(null);
    return Promise.resolve(user.accessToken);
  }

  async getRefreshToken(): Promise<string | null> {
    const user =await this.user;
    if (!user) return Promise.resolve(null);
    return Promise.resolve(user.refreshToken);
  }

  async isAuthenticated(throwException?: boolean): Promise<boolean> {
    const token = await this.user;
    if (!token) {
      if (throwException) throw new Error('Not authenticated');
      return false;
    }
    return await this.isAccessTokenExpired();
  }

  async isAccessTokenExpired(): Promise<boolean> {
    const token = await this.user;
    if (!token) return true;
    try {
      const {exp} = await this.decode();
      return Promise.resolve(Date.now() >= exp * 1000);
    } catch {
      return Promise.resolve(true);
    }
  }

  async decode(): Promise<any | null> {
    const user = await this.user;
    if (!user) return Promise.resolve(null);
    const base64Url = user.accessToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return Promise.resolve(JSON.parse(jsonPayload));
  }

  async getAccessTokenExpiration(): Promise<Date | null> {
    const token = await this.user;
    if (!token) return null;

    try {
      const {exp} = JSON.parse(atob(token.accessToken.split('.')[1]));
      return new Date(exp * 1000);
    } catch {
      return null;
    }
  }

  async getPayload(key?: string): Promise<any | null> {
    const decodedToken = await this.decode();
    return key ? decodedToken[key] : decodedToken;
  }

  async clear(): Promise<void>{
    localStorage.clear()
  }
}

export const authenticationService = new AuthenticationService();
