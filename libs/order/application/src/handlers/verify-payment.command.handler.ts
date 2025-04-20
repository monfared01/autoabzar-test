import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyPaymentCommand } from '../commands/verify-payment.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { ResponseDto } from '../responses/response.dto';
import { IFakeBankTools, IOrderUnitOfWork } from '@autoabzar-test/order-domain';

@CommandHandler(VerifyPaymentCommand)
export class VerifyPaymentCommandHandler
  implements ICommandHandler<VerifyPaymentCommand, ResponseDto<void>>
{
  constructor(
    @Inject('IOrderUnitOfWork') private readonly uow: IOrderUnitOfWork,
    @Inject('IFakeBankTools') private readonly fbt: IFakeBankTools
  ) {}

  async execute(command: VerifyPaymentCommand): Promise<ResponseDto<void>> {
    const payment = await this.uow.paymentRepository.findOne({
      where: { voucherId: command.voucherId, status: 'pending' },
    });

    if (!payment) {
      throw new NotFoundException(
        `Pending payment with voucher ID ${command.voucherId} not found.`
      );
    }

    const isVerify = await this.fbt.verifyPayment(command.voucherId);

    payment.status = isVerify ? 'success' : 'failed';

    await this.uow.paymentRepository.update(payment);

    return ResponseDto.ok();
  }
}
