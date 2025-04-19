import { Injectable, Scope } from '@nestjs/common';
import { UnitOfWork } from '@autoabzar-test/tools';
import {
  ICustomerRepository,
  ISessionRepository,
  ICustomerUnitOfWork,
} from '@autoabzar-test/customer-domain';
import { CustomerEntity } from '../data/persistence/customer.entity';
import { SessionEntity } from '../data/persistence/session.entity';
import { DataSource } from 'typeorm';
import { CustomerRepository } from './repositories/customer.repository';
import { SessionRepository } from './repositories/session.repository';

@Injectable({ scope: Scope.REQUEST })
export class CustomerUnitOfWork
  extends UnitOfWork
  implements ICustomerUnitOfWork
{
  private _customerRepository?: ICustomerRepository;
  private _sessionRepository?: ISessionRepository;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  get customerRepository(): ICustomerRepository {
    if (!this._customerRepository) {
      this._customerRepository = new CustomerRepository(
        this.manager.getRepository(CustomerEntity)
      );
    }
    return this._customerRepository;
  }

  get sessionRepository(): ISessionRepository {
    if (!this._sessionRepository) {
      this._sessionRepository = new SessionRepository(
        this.manager.getRepository(SessionEntity)
      );
    }
    return this._sessionRepository;
  }
}
