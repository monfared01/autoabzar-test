import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCustomerByIdQuery } from '../queries/find-customer-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { ICustomerUnitOfWork } from '@autoabzar-test/customer-domain';
import { Customer } from '@autoabzar-test/customer-domain';

@QueryHandler(FindCustomerByIdQuery)
export class FindCustomerByIdQueryHandler
  implements IQueryHandler<FindCustomerByIdQuery>
{
  constructor(
    @Inject('ICustomerUnitOfWork')
    private readonly uow: ICustomerUnitOfWork
  ) {}

  async execute(query: FindCustomerByIdQuery): Promise<Customer> {
    const repo = this.uow.getRepository<Customer>('Customer');

    const customer = await repo.findOne({
      where: { id: query.id },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }
}
