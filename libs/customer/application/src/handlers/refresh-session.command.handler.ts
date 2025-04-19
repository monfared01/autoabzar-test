import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ICustomerUnitOfWork,
  ITokenTools,
} from '@autoabzar-test/customer-domain';
import { Inject, NotFoundException } from '@nestjs/common';
import { RefreshSessionCommand } from '../commands/refresh-session.command';
import { RefreshSessionResponose } from '../responses/refresh-token.response.dto';
import { MoreThan } from 'typeorm';
import { ResponseDto } from '../responses/response.dto';

@CommandHandler(RefreshSessionCommand)
export class RefreshSessionCommandHandler
  implements
    ICommandHandler<
      RefreshSessionCommand,
      ResponseDto<RefreshSessionResponose>
    >
{
  constructor(
    @Inject('ICustomerUnitOfWork') private readonly uow: ICustomerUnitOfWork,
    @Inject('ITokenTools') private readonly tt: ITokenTools
  ) {}

  async execute(
    command: RefreshSessionCommand
  ): Promise<ResponseDto<RefreshSessionResponose>> {
    let userId: number;
    let isExpired = false;

    try {
      const payload = await this.tt.decode<{ userId: number }>(
        command.accessToken,
        false
      );
      userId = payload.userId;
    } catch {
      try {
        const payload = await this.tt.decode<{ userId: number }>(
          command.accessToken,
          true
        );
        userId = payload.userId;
        isExpired = true;
      } catch {
        throw new NotFoundException('Invalid access token');
      }
    }

    const session = await this.uow.sessionRepository.findOne({
      where: {
        customerId: userId,
        refreshToken: command.refreshToken,
        isRevoked: false,
        expiresAt: MoreThan(new Date()),
      },
    });

    if (!session) {
      throw new NotFoundException('Invalid session or refresh token');
    }

    if (!isExpired) {
      return ResponseDto.ok(
        new RefreshSessionResponose(command.accessToken),
        'Access token still valid'
      );
    }

    const newAccessToken = await this.tt.encode({ userId });
    return ResponseDto.ok(
      new RefreshSessionResponose(newAccessToken),
      'Access token refreshed'
    );
  }
}
