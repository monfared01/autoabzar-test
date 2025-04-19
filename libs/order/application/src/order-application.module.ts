import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OrderInfrastructureModule } from '@autoabzar-test/order-infrastructure';
import { CreateOrderCommandHandler } from './handlers/create-order.commad.handler';
import { DeleteOrderCommandHandler } from './handlers/delete-order.commad.handler';
import { UpdateOrderCommandHandler } from './handlers/update-order.commad.handler';
import { FindAllOrdersQueryHandler } from './handlers/find-order-all.query.handler';
import { FindOrderByIdQueryHandler } from './handlers/find-order-by-id.query.handler';

const CommandHandlers = [
  CreateOrderCommandHandler,
  DeleteOrderCommandHandler,
  UpdateOrderCommandHandler,
];

const QueryHandlers = [FindAllOrdersQueryHandler, FindOrderByIdQueryHandler];

@Module({
  imports: [CqrsModule, OrderInfrastructureModule],
  providers: [...CommandHandlers, ...QueryHandlers],
  exports: [...CommandHandlers, ...QueryHandlers],
})
export class OrderApplicationModule {}
