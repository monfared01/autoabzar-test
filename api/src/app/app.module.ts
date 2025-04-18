import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders/orders.controller';
import { PaymentsController } from './controllers/orders/payments.controller';
import { ConfigModule } from '@nestjs/config';
import { CustomerApplicationModule } from '@autoabzar-test/customer-application';
import { CustomersController } from './controllers/customers/customers.controller';
import { AuthController } from './controllers/customers/auth.controller';

@Module({
  imports: [ConfigModule.forRoot(), CustomerApplicationModule],
  controllers: [
    OrdersController,
    PaymentsController,
    CustomersController,
    AuthController,
  ],
  providers: [],
})
export class AppModule {}
