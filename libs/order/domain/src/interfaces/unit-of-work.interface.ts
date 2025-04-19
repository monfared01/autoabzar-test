import { IUnitOfWork } from '@autoabzar-test/tools';
import { IOrderRepository } from './repositories/order.repository.interface';

export interface IOrderUnitOfWork extends IUnitOfWork {
  readonly orderRepository: IOrderRepository;
}
