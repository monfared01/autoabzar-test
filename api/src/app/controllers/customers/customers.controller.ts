import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateCustomerCommand,
  UpdateCustomerCommand,
  DeleteCustomerCommand,
  FindCustomerByIdQuery,
  FindAllCustomersQuery,
  CustomerResponse,
  ResponseDto,
} from '@autoabzar-test/customer-application';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get()
  async findAll(): Promise<ResponseDto<CustomerResponse[]>> {
    return this.queryBus.execute(new FindAllCustomersQuery());
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseDto<CustomerResponse>> {
    return this.queryBus.execute(new FindCustomerByIdQuery(id));
  }

  @Post()
  async create(
    @Body()
    command: CreateCustomerCommand
  ): Promise<ResponseDto<number>> {
    return this.commandBus.execute(command);
  }

  @Put()
  async update(
    @Body()
    command: UpdateCustomerCommand
  ): Promise<ResponseDto<void>> {
    return this.commandBus.execute(command);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseDto<void>> {
    return this.commandBus.execute(new DeleteCustomerCommand(id));
  }
}
