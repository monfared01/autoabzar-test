import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCustomerCommand } from '../commands/login-customer.command';
import {
  Customer,
  ICustomerUnitOfWork,
  IPasswordTools,
  ITokenTools,
  Session,
} from '@autoabzar-test/customer-domain';
import { Inject, NotFoundException } from '@nestjs/common';
import { LoginCustomerResponose } from '../responses/login-customer.response';

@CommandHandler(LoginCustomerCommand)
export class LoginCustomerCommandHandler
  implements ICommandHandler<LoginCustomerCommand, LoginCustomerResponose>
{
  constructor(
    @Inject('ICustomerUnitOfWork') private readonly uow: ICustomerUnitOfWork,
    @Inject('IPasswordTools') private readonly pt: IPasswordTools,
    @Inject('ITokenTools') private readonly tt: ITokenTools
  ) {}

  async execute(
    command: LoginCustomerCommand
  ): Promise<LoginCustomerResponose> {
    const customerRepo = this.uow.getRepository<Customer>('Customer');
    const sessionRepo = this.uow.getRepository<Session>('Session');

    const customer = await customerRepo.findOne({
      where: { email: command.email },
    });

    if (!customer) {
      throw new NotFoundException(
        `Customer with email ${command.email} not found`
      );
    }

    if ((await this.pt.compare(command.password, customer.password)) == false) {
      throw new NotFoundException(`Customer with this password not found`);
    }

    const accessToken = await this.tt.encode({ userId: customer.id });
    const refreshToken = this.tt.generateGuid();

    await sessionRepo.updateMany(
      { customerId: customer.id, isRevoked: false },
      { isRevoked: true }
    );

    await sessionRepo.create({
      customerId: customer.id,
      refreshToken,
    });

    return new LoginCustomerResponose(accessToken, refreshToken);
  }
}
