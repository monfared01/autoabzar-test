import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCustomerCommand } from '../commands/login-customer.command';
import {
  ICustomerUnitOfWork,
  IPasswordTools,
  ITokenTools,
} from '@autoabzar-test/customer-domain';
import { Inject, NotFoundException } from '@nestjs/common';
import { LoginCustomerResponose } from '../responses/login-customer.response.dto';
import { ResponseDto } from '../responses/response.dto';

@CommandHandler(LoginCustomerCommand)
export class LoginCustomerCommandHandler
  implements
    ICommandHandler<LoginCustomerCommand, ResponseDto<LoginCustomerResponose>>
{
  constructor(
    @Inject('ICustomerUnitOfWork') private readonly uow: ICustomerUnitOfWork,
    @Inject('IPasswordTools') private readonly pt: IPasswordTools,
    @Inject('ITokenTools') private readonly tt: ITokenTools
  ) {}

  async execute(
    command: LoginCustomerCommand
  ): Promise<ResponseDto<LoginCustomerResponose>> {
    const customer = await this.uow.customerRepository.findOne({
      where: { email: command.email },
    });

    if (!customer) {
      throw new NotFoundException(
        `Customer with email ${command.email} not found`
      );
    }

    const passwordMatch = await this.pt.compare(
      command.password,
      customer.password
    );
    if (!passwordMatch) {
      throw new NotFoundException('Invalid credentials');
    }

    const accessToken = await this.tt.encode({ userId: customer.id });
    const refreshToken = this.tt.generateGuid();

    await this.uow.sessionRepository.updateMany(
      { customerId: customer.id, isRevoked: false },
      { isRevoked: true }
    );

    await this.uow.sessionRepository.create({
      customerId: customer.id,
      refreshToken,
    });

    return ResponseDto.ok(
      new LoginCustomerResponose(accessToken, refreshToken),
      'Login successful'
    );
  }
}
