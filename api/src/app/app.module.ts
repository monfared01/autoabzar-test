import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { OrdersController } from './controllers/orders/orders.controller';
import { PaymentsController } from './controllers/orders/payments.controller';
import { ConfigModule } from '@nestjs/config';
import { CustomerApplicationModule } from '@autoabzar-test/customer-application';
import { CustomerController } from './controllers/customers/customers.controller';
import { AuthController } from './controllers/customers/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { IsAdminMiddleware } from './middlewares/is-admin.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomerApplicationModule,
    CqrsModule,
  ],
  controllers: [
    OrdersController,
    PaymentsController,
    CustomerController,
    AuthController,
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, IsAdminMiddleware)
      .forRoutes(CustomerController);

      consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'auth/', method: RequestMethod.PUT });
  }
}
