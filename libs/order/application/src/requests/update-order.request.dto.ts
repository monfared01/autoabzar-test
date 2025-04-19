import { IsInt, IsNumber, Min } from 'class-validator';

export class UpdateOrderRequestDto {
  @IsInt()
  @Min(1)
  public readonly id: number;

  @IsNumber()
  @Min(0)
  public total: number;

  constructor(id: number, total: number) {
    this.id = id;
    this.total = total;
  }
}
