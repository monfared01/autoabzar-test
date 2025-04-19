import { DbModule } from '@autoabzar-test/db';
import { Module } from '@nestjs/common';
import { OrderUnitOfWork } from './data/unit-of-work';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './data/persistence/order.entity';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([OrderEntity])],
  providers: [
    OrderUnitOfWork,
    {
      provide: 'IOrderUnitOfWork',
      useExisting: OrderUnitOfWork,
    },
  ],
  exports: ['IOrderUnitOfWork'],
})
export class OrderInfrastructureModule {}
