export class Payment {
  constructor(
    public readonly id: number,
    public orderId: number,
    public voucherId: string,
    public status: 'success' | 'failed' | 'pending',
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
