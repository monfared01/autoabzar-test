import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../commands/create-order.command';
import { Inject } from '@nestjs/common';
import { ResponseDto } from '../responses/response.dto';
import { IOrderUnitOfWork } from '@autoabzar-test/order-domain';

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand, ResponseDto<number>>
{
  constructor(
    @Inject('IOrderUnitOfWork') private readonly uow: IOrderUnitOfWork
  ) {}

  async execute(command: CreateOrderCommand): Promise<ResponseDto<number>> {
    const customer = await this.uow.orderRepository.create(command);
    return ResponseDto.ok(customer.id);
  }
}
