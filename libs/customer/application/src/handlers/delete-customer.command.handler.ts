import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCustomerCommand } from '../commands/delete-customer.command';
import { Customer, ICustomerUnitOfWork } from '@autoabzar-test/customer-domain';
import { Inject, NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerCommandHandler
  implements ICommandHandler<DeleteCustomerCommand, void>
{
  constructor(
    @Inject('ICustomerUnitOfWork') private readonly uow: ICustomerUnitOfWork
  ) {}

  async execute(command: DeleteCustomerCommand): Promise<void> {
    const customerRepo = this.uow.getRepository<Customer>('Customer');

    const result = await customerRepo.delete({ id: command.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Customer with ID ${command.id} not found`);
    }
  }
}
