export class Session {
  constructor(
    public readonly id: number,
    public readonly customerId: number,
    public refreshToken: string,
    public readonly createdAt: Date,
    public readonly expiresAt: Date,
    public isRevoked = false
  ) {}
}
