import {
  CreatePaymentCommand,
  CreatePaymentRequestDto,
  ResponseDto,
  VerifyPaymentCommand,
} from '@autoabzar-test/order-application';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(
    @Body() data: CreatePaymentRequestDto,
    @Req() req: Request
  ): Promise<ResponseDto<string>> {
    return this.commandBus.execute(
      new CreatePaymentCommand(data.orderId, req['userId'])
    );
  }

  @Post('verify-payment')
  async verify(
    @Body()
    command: VerifyPaymentCommand
  ): Promise<ResponseDto<void>> {
    return this.commandBus.execute(command);
  }
}
