import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePaymentCommand } from '../commands/create-payment.command';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ResponseDto } from '../responses/response.dto';
import { IFakeBankTools, IOrderUnitOfWork } from '@autoabzar-test/order-domain';
import { In } from 'typeorm';

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentCommandHandler
  implements ICommandHandler<CreatePaymentCommand, ResponseDto<string>>
{
  constructor(
    @Inject('IOrderUnitOfWork') private readonly uow: IOrderUnitOfWork,
    @Inject('IFakeBankTools') private readonly fbt: IFakeBankTools
  ) {}

  async execute(command: CreatePaymentCommand): Promise<ResponseDto<string>> {
    const order = await this.uow.orderRepository.findOne({
      where: { id: command.orderId, customerId: command.customerId },
    });

    if (!order) {
      throw new NotFoundException(
        `Order with ID ${command.orderId} not accessible for you.`
      );
    }

    const { count } = await this.uow.paymentRepository.count({
      where: { status: In(['pending', 'success']), orderId: command.orderId },
    });

    if (count > 0) {
      throw new BadRequestException(
        `Order with ID ${command.orderId} can not be paid again.`
      );
    }

    const voucherId = await this.fbt.createVoucherId(order.total);

    await this.uow.paymentRepository.create({
      orderId: command.orderId,
      status: 'pending',
      voucherId,
    });

    return ResponseDto.ok(voucherId);
  }
}
