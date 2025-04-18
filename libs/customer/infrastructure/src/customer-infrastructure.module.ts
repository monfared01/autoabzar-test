import { Module } from '@nestjs/common';
import { DbModule } from '@autoabzar-test/db';
import { CustomerUnitOfWork } from './data/unit-of-work';
import { CustomerRepository } from './data/repositories/customer.repository';
import { SessionRepository } from './data/repositories/session.repository';

@Module({
  imports: [DbModule],
  providers: [CustomerUnitOfWork, CustomerRepository, SessionRepository],
  exports: [CustomerUnitOfWork],
})
export class CustomerInfrastructureModule {}
