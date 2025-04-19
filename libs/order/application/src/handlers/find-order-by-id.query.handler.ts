import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOrderByIdQuery } from '../queries/find-order-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { IOrderUnitOfWork } from '@autoabzar-test/order-domain';
import { OrderResponse } from '../responses/order.response.dto';
import { ResponseDto } from '../responses/response.dto';

@QueryHandler(FindOrderByIdQuery)
export class FindOrderByIdQueryHandler
  implements IQueryHandler<FindOrderByIdQuery, ResponseDto<OrderResponse>>
{
  constructor(
    @Inject('IOrderUnitOfWork')
    private readonly uow: IOrderUnitOfWork
  ) {}

  async execute(
    query: FindOrderByIdQuery
  ): Promise<ResponseDto<OrderResponse>> {
    const repo = this.uow.orderRepository;

    const order = await repo.findOne({
      where: { id: query.id },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${query.id} not found`);
    }

    return ResponseDto.ok(
      new OrderResponse(
        order.id,
        order.total,
        order.createdAt,
        order.updatedAt
      ),
      'Order found'
    );
  }
}
