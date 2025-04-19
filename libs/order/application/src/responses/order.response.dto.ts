export class OrderResponse {
  constructor(
    public readonly id: number,
    public total: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
