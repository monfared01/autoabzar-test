import { Payment } from "./payment";

export class Order {
  constructor(
    public readonly id: number,
    public customerId: number,
    public total: number,
    public createdAt: Date,
    public updatedAt: Date,
    public payments: Payment[] = [],
  ) {}
}
