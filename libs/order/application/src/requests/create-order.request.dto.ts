import { IsNumber, Min } from 'class-validator';

export class CreateOrderRequestDto {
  @IsNumber()
  @Min(0)
  public total: number;

  constructor(total: number) {
    this.total = total;
  }
}
