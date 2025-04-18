import { IGenericRepository } from '@autoabzar-test/tools';
import { Customer } from '../../core/customer';

export interface ICustomerRepository extends IGenericRepository<Customer> {
  findByEmail(email: string): Promise<Customer | null>;
}
