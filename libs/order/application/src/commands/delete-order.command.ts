import { ICommand } from '@nestjs/cqrs';
import { IsInt, Min } from 'class-validator';

export class DeleteOrderCommand implements ICommand {
  @IsInt()
  @Min(1)
  public readonly id: number;

  @IsInt()
  @Min(1)
  public readonly customerId: number;

  constructor(id: number, customerId: number) {
    this.id = id;
    this.customerId = customerId;
  }
}
