import { IQuery } from '@nestjs/cqrs';
import { IsInt, Min } from 'class-validator';

export class FindOrderByIdQuery implements IQuery {
  @IsInt()
  @Min(1)
  public readonly id: number;

  constructor(id: number) {
    this.id = id;
  }
}
