import { IQuery } from '@nestjs/cqrs';
import { IsInt, Min } from 'class-validator';

export class FindAllOrdersQuery implements IQuery {
  @IsInt()
  @Min(1)
  public readonly customerId: number;

  constructor(customerId: number) {
    this.customerId = customerId;
  }
}
