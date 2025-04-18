import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllCustomersQuery } from '../queries/find-all-customers.query';
import { Inject } from '@nestjs/common';
import { ICustomerUnitOfWork } from '@autoabzar-test/customer-domain';
import { Customer } from '@autoabzar-test/customer-domain';

@QueryHandler(FindAllCustomersQuery)
export class FindAllCustomersQueryHandler
  implements IQueryHandler<FindAllCustomersQuery>
{
  constructor(
    @Inject('ICustomerUnitOfWork')
    private readonly uow: ICustomerUnitOfWork
  ) {}

  async execute(): Promise<Customer[]> {
    const repo = this.uow.getRepository<Customer>('Customer');
    return repo.findMany({});
  }
}
