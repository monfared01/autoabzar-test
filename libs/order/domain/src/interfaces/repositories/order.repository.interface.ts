import { IGenericRepository } from '@autoabzar-test/tools';
import { Order } from '../../core/order';

export interface IOrderRepository extends IGenericRepository<Order> {
  findByCustomerId(customerId: number): Promise<Order[]>;
}
