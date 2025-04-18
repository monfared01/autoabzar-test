import { Injectable } from '@nestjs/common';
import { GenericRepository } from '@autoabzar-test/tools';
import { CustomerEntity } from '../persistence/customer.entity';
import { Repository } from 'typeorm';
import { ICustomerRepository, Customer } from '@autoabzar-test/customer-domain';

@Injectable()
export class CustomerRepository
  extends GenericRepository<CustomerEntity>
  implements ICustomerRepository
{
  constructor(repository: Repository<CustomerEntity>) {
    super(repository);
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const entity = await this.repository.findOne({ where: { email } });
    return entity ? this.toDomain(entity) : null;
  }

  private toDomain(entity: CustomerEntity): Customer {
    return entity.toDomain();
  }
}
