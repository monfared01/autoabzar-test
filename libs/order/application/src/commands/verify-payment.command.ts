import { IsUUID } from 'class-validator';

export class VerifyPaymentCommand {
  constructor(voucherId: string) {
    this.voucherId = voucherId;
  }

  @IsUUID()
  readonly voucherId: string;
}
