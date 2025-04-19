import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  OrderResponse,
  ResponseDto,
  FindAllOrdersQuery,
  FindOrderByIdQuery,
  DeleteOrderCommand,
  CreateOrderCommand,
  CreateOrderRequestDto,
  UpdateOrderCommand,
  UpdateOrderRequestDto,
} from '@autoabzar-test/order-application';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}


  @Get('list')
  async getOrders(@Req() req: Request): Promise<ResponseDto<OrderResponse[]>> {
    return this.queryBus.execute(new FindAllOrdersQuery(req['userId']));
  }

  @Get('list/:customerId')
  async findByCustomerId(
    @Param('customerId', ParseIntPipe) customerId: number
  ): Promise<ResponseDto<OrderResponse[]>> {
    return this.queryBus.execute(new FindAllOrdersQuery(customerId));
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseDto<OrderResponse>> {
    return this.queryBus.execute(new FindOrderByIdQuery(id));
  }

  @Post()
  async create(
    @Body() data: CreateOrderRequestDto,
    @Req() req: Request
  ): Promise<ResponseDto<number>> {
    return this.commandBus.execute(
      new CreateOrderCommand(data.total, req['userId'])
    );
  }

  @Put()
  async update(
    @Body() data: UpdateOrderRequestDto,
    @Req() req: Request
  ): Promise<ResponseDto<void>> {
    return this.commandBus.execute(
      new UpdateOrderCommand(data.id, data.total, req['userId'])
    );
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request
  ): Promise<ResponseDto<void>> {
    return this.commandBus.execute(new DeleteOrderCommand(id, req['userId']));
  }
}
