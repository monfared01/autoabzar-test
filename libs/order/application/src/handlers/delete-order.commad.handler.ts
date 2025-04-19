import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteOrderCommand } from '../commands/delete-order.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { ResponseDto } from '../responses/response.dto';
import { IOrderUnitOfWork } from '@autoabzar-test/order-domain';

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderCommandHandler
  implements ICommandHandler<DeleteOrderCommand, ResponseDto<void>>
{
  constructor(
    @Inject('IOrderUnitOfWork') private readonly uow: IOrderUnitOfWork
  ) {}

  async execute(command: DeleteOrderCommand): Promise<ResponseDto<void>> {
    const result = await this.uow.orderRepository.delete({
      id: command.id,
      customerId: command.customerId,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${command.id} not found for you.`);
    }

    return ResponseDto.ok();
  }
}
