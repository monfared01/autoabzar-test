import { Injectable, Scope } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UnitOfWork } from '@autoabzar-test/tools';
import {
  IOrderRepository,
  IOrderUnitOfWork,
  IPaymentRepository,
} from '@autoabzar-test/order-domain';
import { OrderEntity } from '../data/persistence/order.entity';
import { OrderRepository } from './repositories/order.repository';
import { PaymentRepository } from './repositories/payment.repository';
import { PaymentEntity } from './persistence/payment.entity';

@Injectable({ scope: Scope.REQUEST })
export class OrderUnitOfWork extends UnitOfWork implements IOrderUnitOfWork {
  private _orderRepository?: IOrderRepository;
  private _paymentRepository?: IPaymentRepository;

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

  get paymentRepository(): IPaymentRepository {
    if (!this._paymentRepository) {
      this._paymentRepository = new PaymentRepository(
        this.manager.getRepository(PaymentEntity)
      );
    }
    return this._paymentRepository;
  }
}
