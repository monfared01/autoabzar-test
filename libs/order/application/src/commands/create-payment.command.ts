import { ICommand } from '@nestjs/cqrs';
import { CreatePaymentRequestDto } from '../requests/create-payment.request.dto';
import { IsInt, Min } from 'class-validator';

export class CreatePaymentCommand
  extends CreatePaymentRequestDto
  implements ICommand
{
  @IsInt()
  @Min(1)
  public readonly customerId: number;

  constructor(orderId: number, customerId: number) {
    super(orderId);
    this.customerId = customerId;
  }
}
