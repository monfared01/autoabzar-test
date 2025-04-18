import { Inject, Injectable, Scope } from '@nestjs/common';
import { DataSource, EntityTarget } from 'typeorm';
import { UnitOfWork, IGenericRepository } from '@autoabzar-test/tools';
import {
  IOrderRepository,
  IOrderUnitOfWork,
} from '@autoabzar-test/order-domain';
import { OrderEntity } from '../data/persistence/order.entity';
import { OrderRepository } from './repositories/order.repository';

@Injectable({ scope: Scope.REQUEST })
export class OrderUnitOfWork extends UnitOfWork implements IOrderUnitOfWork {
  private _customerRepository?: IOrderRepository;

  constructor(@Inject('DataSource') dataSource: DataSource) {
    super(dataSource);
  }

  get customerRepository(): IOrderRepository {
    if (!this._customerRepository) {
      this._customerRepository = new OrderRepository(
        this.manager.getRepository(OrderEntity)
      );
    }
    return this._customerRepository;
  }

  getRepository<T>(entity: EntityTarget<T>): IGenericRepository<T> {
    if (entity === OrderEntity) {
      return this.customerRepository as unknown as IGenericRepository<T>;
    }

    throw new Error(`Repository for entity ${entity.toString()} not found`);
  }
}
