import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ICustomerUnitOfWork, Session } from '@autoabzar-test/customer-domain';
import { Inject } from '@nestjs/common';
import { LogoutSessionCommand } from '../commands/logout-session.command';

@CommandHandler(LogoutSessionCommand)
export class LogoutCustomerCommandHandler
  implements ICommandHandler<LogoutSessionCommand, void>
{
  constructor(
    @Inject('ICustomerUnitOfWork') private readonly uow: ICustomerUnitOfWork
  ) {}

  async execute(command: LogoutSessionCommand): Promise<void> {
    const sessionRepo = this.uow.getRepository<Session>('Session');

    await sessionRepo.updateMany(
      { customerId: command.userId, isRevoked: false },
      { isRevoked: true }
    );
  }
}
