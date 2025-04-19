import { ICommand } from '@nestjs/cqrs';
import { UpdateOrderRequestDto } from '../requests/update-order.request.dto';
import { IsInt, Min } from 'class-validator';

export class UpdateOrderCommand extends UpdateOrderRequestDto implements ICommand {
  @IsInt()
  @Min(1)
  public readonly customerId: number;

  constructor(id: number, total: number, customerId: number) {
    super(id, total);
    this.customerId = customerId;
  }
}
