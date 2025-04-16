import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { OrderItemsController } from './controllers/orders/order-items.controller';
import { PaymentsController } from './controllers/orders/payments.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    OrdersController,
    OrderItemsController,
    PaymentsController,
  ],
  providers: [],
})
export class AppModule {}
