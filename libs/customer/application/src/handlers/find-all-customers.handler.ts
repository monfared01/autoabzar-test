import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllCustomersQuery } from '../queries/find-all-customers.query';
import { Inject } from '@nestjs/common';
import { ICustomerUnitOfWork } from '@autoabzar-test/customer-domain';
import { CustomerResponse } from '../responses/customer.response.dto';
import { ResponseDto } from '../responses/response.dto';

@QueryHandler(FindAllCustomersQuery)
export class FindAllCustomersQueryHandler
  implements
    IQueryHandler<FindAllCustomersQuery, ResponseDto<CustomerResponse[]>>
{
  constructor(
    @Inject('ICustomerUnitOfWork')
    private readonly uow: ICustomerUnitOfWork
  ) {}

  async execute(): Promise<ResponseDto<CustomerResponse[]>> {
    const repo = this.uow.customerRepository;
    const customers = await repo.findMany({});
    return ResponseDto.ok(customers);
  }
}
