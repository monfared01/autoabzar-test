import {
  LoginCustomerCommand,
  LoginCustomerResponose,
  LogoutSessionCommand,
  RefreshSessionCommand,
  RefreshSessionResponose,
} from '@autoabzar-test/customer-application';
import { Body, Controller, Post, Put, Req } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async login(
    @Body()
    command: LoginCustomerCommand
  ): Promise<LoginCustomerResponose> {
    return this.commandBus.execute(command);
  }

  @Put()
  async logout(@Req() req: Request): Promise<void> {
    return this.commandBus.execute(new LogoutSessionCommand(req['userId']));
  }

  @Post('refresh-token')
  async refresh(
    @Body()
    command: RefreshSessionCommand
  ): Promise<RefreshSessionResponose> {
    return this.commandBus.execute(command);
  }
}
