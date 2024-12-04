import Cookies from "js-cookie";

export class TokenService {
  static readonly accessToken = "@access_token";
  static readonly refreshToken = "@refresh_token";

  static saveTokens({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }): void {
    Cookies.set(this.accessToken, accessToken);
    Cookies.set(this.refreshToken, refreshToken);
  }

  static getTokens(): { accessToken?: string; refreshToken?: string } {
    const accessToken = Cookies.get(this.accessToken);
    const refreshToken = Cookies.get(this.refreshToken);

    return { accessToken, refreshToken };
  }

  static hasTokens(): boolean {
    return !!Cookies.get(this.accessToken) && !!Cookies.get(this.refreshToken);
  }

  static removeTokens(): void {
    Cookies.remove(this.accessToken);
    Cookies.remove(this.refreshToken);
  }
}
