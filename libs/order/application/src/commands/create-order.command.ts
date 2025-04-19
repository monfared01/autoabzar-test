import { ICommand } from '@nestjs/cqrs';
import { CreateOrderRequestDto } from '../requests/create-order.request.dto';
import { IsInt, Min } from 'class-validator';

export class CreateOrderCommand
  extends CreateOrderRequestDto
  implements ICommand
{
  @IsInt()
  @Min(1)
  public readonly customerId: number;

  constructor(total: number, customerId: number) {
    super(total);
    this.customerId = customerId;
  }
}
