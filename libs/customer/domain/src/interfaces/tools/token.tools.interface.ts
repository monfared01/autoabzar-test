export interface ITokenTools {
  encode(
    payload: { userId: number },
    expiresIn?: string | number
  ): Promise<string>;
  decode<T>(token: string, ignoreExpiration: boolean): Promise<T>;
  generateGuid(): string;
}
