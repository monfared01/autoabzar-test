import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ICustomerUnitOfWork } from '@autoabzar-test/customer-domain';
import { Inject } from '@nestjs/common';
import { LogoutSessionCommand } from '../commands/logout-session.command';
import { ResponseDto } from '../responses/response.dto';

@CommandHandler(LogoutSessionCommand)
export class LogoutCustomerCommandHandler
  implements ICommandHandler<LogoutSessionCommand, ResponseDto<void>>
{
  constructor(
    @Inject('ICustomerUnitOfWork') private readonly uow: ICustomerUnitOfWork
  ) {}

  async execute(command: LogoutSessionCommand): Promise<ResponseDto<void>> {
    await this.uow.sessionRepository.updateMany(
      { customerId: command.userId, isRevoked: false },
      { isRevoked: true }
    );

    return ResponseDto.ok(undefined, 'Logged out successfully');
  }
}
