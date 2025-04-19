export interface IFakeBankTools {
  createVoucherId(total: number): Promise<string>;
  verifyPayment(voucherId: string): Promise<boolean>;
}
