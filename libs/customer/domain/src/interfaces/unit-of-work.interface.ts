import { IUnitOfWork } from '@autoabzar-test/tools';
import { ICustomerRepository } from './repositories/customer.repository.interface';
import { ISessionRepository } from './repositories/session.repository.interface';

export interface ICustomerUnitOfWork extends IUnitOfWork {
  readonly customerRepository: ICustomerRepository;
  readonly sessionRepository: ISessionRepository;
}
