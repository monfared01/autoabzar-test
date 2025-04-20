import { IsInt, Min } from 'class-validator';

export class CreatePaymentRequestDto {
  @IsInt()
  @Min(1)
  public readonly orderId: number;

  constructor(id: number) {
    this.orderId = id;
  }
}
