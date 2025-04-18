import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ValidateSessionQuery } from '../queries/validate-session.query';
import {
  Customer,
  ICustomerUnitOfWork,
  ITokenTools,
  Session,
} from '@autoabzar-test/customer-domain';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { ValidateSessionResponose } from '../responses/validate-session.response';

@QueryHandler(ValidateSessionQuery)
export class ValidateSessionQueryHandler
  implements IQueryHandler<ValidateSessionQuery, ValidateSessionResponose>
{
  constructor(
    @Inject('ITokenTools') private readonly tt: ITokenTools,
    @Inject('ICustomerUnitOfWork') private readonly uow: ICustomerUnitOfWork
  ) {}

  async execute(
    query: ValidateSessionQuery
  ): Promise<ValidateSessionResponose> {
    const customerRepo = this.uow.getRepository<Customer>('Customer');
    const sessionRepo = this.uow.getRepository<Session>('Session');

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

    return new ValidateSessionResponose(customer.isAdmin, customer.id);
  }
}
