import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCustomerCommand } from '../commands/create-customer.command';
import {
  Customer,
  ICustomerUnitOfWork,
  IPasswordTools,
} from '@autoabzar-test/customer-domain';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerCommandHandler
  implements ICommandHandler<CreateCustomerCommand, number>
{
  constructor(
    @Inject('ICustomerUnitOfWork') private readonly uow: ICustomerUnitOfWork,
    @Inject('IPasswordTools') private readonly pt: IPasswordTools
  ) {}

  async execute(command: CreateCustomerCommand): Promise<number> {
    const password = await this.pt.hash(command.password);
    const customer = await this.uow.getRepository<Customer>('Customer').create({
      ...command,
      password,
    });

    return customer.id;
  }
}
