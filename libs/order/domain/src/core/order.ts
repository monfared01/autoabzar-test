export class Order {
  constructor(
    public readonly id: string,
    public customerId: string,
    public total: number,
    public createdAt: Date = new Date()
  ) {}
}
