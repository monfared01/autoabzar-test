import { IUnitOfWork } from '@autoabzar-test/tools';
import { IOrderRepository } from './repositories/order.repository.interface';
import { IPaymentRepository } from './repositories/payment.repository.interface';

export interface IOrderUnitOfWork extends IUnitOfWork {
  readonly orderRepository: IOrderRepository;
  readonly paymentRepository: IPaymentRepository;
}
