import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCustomerCommand } from '../commands/delete-customer.command';
import { ICustomerUnitOfWork } from '@autoabzar-test/customer-domain';
import { Inject, NotFoundException } from '@nestjs/common';
import { ResponseDto } from '../responses/response.dto';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerCommandHandler
  implements ICommandHandler<DeleteCustomerCommand, ResponseDto<void>>
{
  constructor(
    @Inject('ICustomerUnitOfWork') private readonly uow: ICustomerUnitOfWork
  ) {}

  async execute(command: DeleteCustomerCommand): Promise<ResponseDto<void>> {
    const customerRepo = this.uow.customerRepository;
    const result = await customerRepo.delete({ id: command.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Customer with ID ${command.id} not found`);
    }

    return ResponseDto.ok();
  }
}
