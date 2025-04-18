import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ICustomerUnitOfWork,
  ITokenTools,
  Session,
} from '@autoabzar-test/customer-domain';
import { Inject, NotFoundException } from '@nestjs/common';
import { RefreshSessionCommand } from '../commands/refresh-session.command';
import { RefreshSessionResponose } from '../responses/refresh-token.response';
import { MoreThan } from 'typeorm';

@CommandHandler(RefreshSessionCommand)
export class RefreshSessionCommandHandler
  implements ICommandHandler<RefreshSessionCommand, RefreshSessionResponose>
{
  constructor(
    @Inject('ICustomerUnitOfWork') private readonly uow: ICustomerUnitOfWork,
    @Inject('ITokenTools') private readonly tt: ITokenTools
  ) {}

  async execute(
    command: RefreshSessionCommand
  ): Promise<RefreshSessionResponose> {
    const sessionRepo = this.uow.getRepository<Session>('Session');

    const { userId } = await this.tt.decode<{ userId: number }>(
      command.accessToken,
      true
    );

    const session = await sessionRepo.findOne({
      where: {
        customerId: userId,
        refreshToken: command.refreshToken,
        isRevoked: false,
        expiresAt: MoreThan(new Date()),
      },
    });

    if (!session) {
      throw new NotFoundException(`Invalid token !`);
    }

    return new RefreshSessionResponose(await this.tt.encode({ userId }));
  }
}
