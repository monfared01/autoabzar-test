import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ValidateSessionQuery } from '../queries/validate-session.query';
import {
  ICustomerUnitOfWork,
  ITokenTools,
} from '@autoabzar-test/customer-domain';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { ValidateSessionDto } from '../responses/validate-session.dto';

@QueryHandler(ValidateSessionQuery)
export class ValidateSessionQueryHandler
  implements IQueryHandler<ValidateSessionQuery, ValidateSessionDto>
{
  constructor(
    @Inject('ITokenTools') private readonly tt: ITokenTools,
    @Inject('ICustomerUnitOfWork') private readonly uow: ICustomerUnitOfWork
  ) {}

  async execute(query: ValidateSessionQuery): Promise<ValidateSessionDto> {
    const customerRepo = this.uow.customerRepository;
    const sessionRepo = this.uow.sessionRepository;

    let userId: number;

    try {
      const payload = await this.tt.decode<{ userId: number }>(
        query.accessToken,
        false
      );
      userId = payload.userId;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }

    const session = await sessionRepo.findOne({
      where: {
        customerId: userId,
        isRevoked: false,
      },
    });

    if (!session) {
      throw new UnauthorizedException('Session not found or revoked');
    }

    const customer = await customerRepo.findOne({
      where: {
        id: userId,
      },
    });

    if (!customer) {
      throw new UnauthorizedException('User not found');
    }

    return new ValidateSessionDto(customer.isAdmin, customer.id);
  }
}
