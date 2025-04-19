import { DbModule } from '@autoabzar-test/db';
import { Module } from '@nestjs/common';
import { OrderUnitOfWork } from './data/unit-of-work';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './data/persistence/order.entity';
import { FakeBankTools } from './tools/fake-bank.tools';
import { PaymentEntity } from './data/persistence/payment.entity';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([OrderEntity, PaymentEntity])],
  providers: [
    OrderUnitOfWork,
    {
      provide: 'IOrderUnitOfWork',
      useExisting: OrderUnitOfWork,
    },
    FakeBankTools,
    {
      provide: 'IFakeBankTools',
      useExisting: FakeBankTools,
    },
  ],
  exports: ['IOrderUnitOfWork', 'IFakeBankTools'],
})
export class OrderInfrastructureModule {}
