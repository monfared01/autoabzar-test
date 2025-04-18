export class Order {
  constructor(
    public readonly id: number,
    public customerId: number,
    public total: number,
    public createdAt: Date = new Date()
  ) {}
}
