import { DbModule } from '@autoabzar-test/db';
import { Module } from '@nestjs/common';
import { OrderUnitOfWork } from './data/unit-of-work';
import { OrderRepository } from './data/repositories/order.repository';

@Module({
  imports: [DbModule],
  providers: [OrderUnitOfWork, OrderRepository],
  exports: [OrderUnitOfWork],
})
export class OrderInfrastructureModule {}
