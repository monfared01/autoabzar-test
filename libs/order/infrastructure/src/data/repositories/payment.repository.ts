import { Injectable } from '@nestjs/common';
import { GenericRepository } from '@autoabzar-test/tools';
import { Repository } from 'typeorm';
import { IPaymentRepository } from '@autoabzar-test/order-domain';
import { PaymentEntity } from '../persistence/payment.entity';

@Injectable()
export class PaymentRepository
  extends GenericRepository<PaymentEntity>
  implements IPaymentRepository
{
  constructor(repository: Repository<PaymentEntity>) {
    super(repository);
  }
}
