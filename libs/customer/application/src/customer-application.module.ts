import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CustomerInfrastructureModule } from '@autoabzar-test/customer-infrastructure';
import { CreateCustomerCommandHandler } from './handlers/create-customer.command.handler';
import { DeleteCustomerCommandHandler } from './handlers/delete-customer.command.handler';
import { LoginCustomerCommandHandler } from './handlers/login-customer.command.handler';
import { LogoutCustomerCommandHandler } from './handlers/logout-session.command.handler';
import { RefreshSessionCommandHandler } from './handlers/refresh-session.command.handler';
import { UpdateCustomerCommandHandler } from './handlers/update-customer.command.handler';
import { FindAllCustomersQueryHandler } from './handlers/find-all-customers.handler';
import { FindCustomerByIdQueryHandler } from './handlers/find-customer-by-id.query.handler';
import { ValidateSessionQueryHandler } from './handlers/validate-session.query.handler';

const CommandHandlers = [
  CreateCustomerCommandHandler,
  DeleteCustomerCommandHandler,
  LoginCustomerCommandHandler,
  LogoutCustomerCommandHandler,
  RefreshSessionCommandHandler,
  UpdateCustomerCommandHandler,
];

const QueryHandlers = [
  FindAllCustomersQueryHandler,
  FindCustomerByIdQueryHandler,
  ValidateSessionQueryHandler,
];

@Module({
  imports: [CqrsModule, CustomerInfrastructureModule],
  providers: [...CommandHandlers, ...QueryHandlers],
  exports: [...CommandHandlers, ...QueryHandlers],
})
export class CustomerApplicationModule {}
