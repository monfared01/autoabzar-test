import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrderCommand } from '../commands/update-order.command';
import { IOrderUnitOfWork } from '@autoabzar-test/order-domain';
import { Inject, NotFoundException } from '@nestjs/common';
import { ResponseDto } from '../responses/response.dto';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderCommandHandler
  implements ICommandHandler<UpdateOrderCommand, ResponseDto<void>>
{
  constructor(
    @Inject('IOrderUnitOfWork') private readonly uow: IOrderUnitOfWork
  ) {}

  async execute(command: UpdateOrderCommand): Promise<ResponseDto<void>> {
    const orderRepository = this.uow.orderRepository;
    const order = await orderRepository.findOne({
      where: { id: command.id, customerId: command.customerId },
    });

    if (!order) {
      throw new NotFoundException(
        `Order with ID ${command.id} can not be updated by you.`
      );
    }

    order.total = command.total;

    await orderRepository.update(order);

    return ResponseDto.ok(undefined, 'Order updated successfully');
  }
}
