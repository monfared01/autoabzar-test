export class LoginCustomerResponose {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string
  ) {}
}
