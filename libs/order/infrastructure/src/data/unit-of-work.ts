import { Injectable, Scope } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UnitOfWork } from '@autoabzar-test/tools';
import {
  IOrderRepository,
  IOrderUnitOfWork,
} from '@autoabzar-test/order-domain';
import { OrderEntity } from '../data/persistence/order.entity';
import { OrderRepository } from './repositories/order.repository';

@Injectable({ scope: Scope.REQUEST })
export class OrderUnitOfWork extends UnitOfWork implements IOrderUnitOfWork {
  private _orderRepository?: IOrderRepository;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  get orderRepository(): IOrderRepository {
    if (!this._orderRepository) {
      this._orderRepository = new OrderRepository(
        this.manager.getRepository(OrderEntity)
      );
    }
    return this._orderRepository;
  }
}
