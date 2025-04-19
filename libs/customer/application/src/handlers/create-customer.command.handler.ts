import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCustomerCommand } from '../commands/create-customer.command';
import {
  ICustomerUnitOfWork,
  IPasswordTools,
} from '@autoabzar-test/customer-domain';
import { Inject } from '@nestjs/common';
import { ResponseDto } from '../responses/response.dto';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerCommandHandler
  implements ICommandHandler<CreateCustomerCommand, ResponseDto<number>>
{
  constructor(
    @Inject('ICustomerUnitOfWork') private readonly uow: ICustomerUnitOfWork,
    @Inject('IPasswordTools') private readonly pt: IPasswordTools
  ) {}

  async execute(command: CreateCustomerCommand): Promise<ResponseDto<number>> {
    const password = await this.pt.hash(command.password);
    const customer = await this.uow.customerRepository.create({
      ...command,
      password,
    });
    return ResponseDto.ok(customer.id);
  }
}
