export class PaymentResponse {
  constructor(
    public voucherId: string,
    public status: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
