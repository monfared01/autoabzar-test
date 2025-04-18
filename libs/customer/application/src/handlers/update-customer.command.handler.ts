import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCustomerCommand } from '../commands/update-customer.command';
import {
  Customer,
  ICustomerUnitOfWork,
  IPasswordTools,
} from '@autoabzar-test/customer-domain';
import { Inject, NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerCommandHandler
  implements ICommandHandler<UpdateCustomerCommand, void>
{
  constructor(
    @Inject('ICustomerUnitOfWork') private readonly uow: ICustomerUnitOfWork,
    @Inject('IPasswordTools') private readonly pt: IPasswordTools
  ) {}

  async execute(command: UpdateCustomerCommand): Promise<void> {
    const customerRepo = this.uow.getRepository<Customer>('Customer');

    const customer = await customerRepo.findOne({ where: { id: command.id } });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${command.id} not found`);
    }

    customer.name = command.name;
    customer.email = command.email;
    customer.password = await this.pt.hash(command.password);
    customer.isAdmin = command.isAdmin;

    await customerRepo.update(customer);
  }
}
