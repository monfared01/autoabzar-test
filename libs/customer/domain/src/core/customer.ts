export class Customer {
  constructor(
    public readonly id: number,
    public name: string,
    public email: string,
    public password: string,
    public isAdmin: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
