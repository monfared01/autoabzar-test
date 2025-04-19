import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteOrderCommand } from '../commands/delete-order.command';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ResponseDto } from '../responses/response.dto';
import { IOrderUnitOfWork } from '@autoabzar-test/order-domain';
import { In } from 'typeorm';

@CommandHandler(DeleteOrderCommand)
export class DeleteOrderCommandHandler
  implements ICommandHandler<DeleteOrderCommand, ResponseDto<void>>
{
  constructor(
    @Inject('IOrderUnitOfWork') private readonly uow: IOrderUnitOfWork
  ) {}

  async execute(command: DeleteOrderCommand): Promise<ResponseDto<void>> {
    const payment = await this.uow.paymentRepository.findOne({
      where: {
        orderId: command.id,
        status: In(['pending', 'success']),
      },
    });

    if (payment !== null) {
      throw new BadRequestException(
        `Order with ID ${command.id} can not be updated because it has payment.`
      );
    }

    const result = await this.uow.orderRepository.delete({
      id: command.id,
      customerId: command.customerId,
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        `Order with ID ${command.id} not found for you.`
      );
    }

    return ResponseDto.ok();
  }
}
