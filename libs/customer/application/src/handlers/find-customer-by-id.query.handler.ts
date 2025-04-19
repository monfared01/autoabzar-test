import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCustomerByIdQuery } from '../queries/find-customer-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { ICustomerUnitOfWork } from '@autoabzar-test/customer-domain';
import { CustomerResponse } from '../responses/customer.response.dto';
import { ResponseDto } from '../responses/response.dto';

@QueryHandler(FindCustomerByIdQuery)
export class FindCustomerByIdQueryHandler
  implements
    IQueryHandler<FindCustomerByIdQuery, ResponseDto<CustomerResponse>>
{
  constructor(
    @Inject('ICustomerUnitOfWork')
    private readonly uow: ICustomerUnitOfWork
  ) {}

  async execute(
    query: FindCustomerByIdQuery
  ): Promise<ResponseDto<CustomerResponse>> {
    const repo = this.uow.customerRepository;

    const customer = await repo.findOne({
      where: { id: query.id },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${query.id} not found`);
    }

    return ResponseDto.ok(customer, 'Customer found');
  }
}
