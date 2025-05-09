import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllOrdersQuery } from '../queries/find-all-order.query';
import { Inject } from '@nestjs/common';
import { IOrderUnitOfWork } from '@autoabzar-test/order-domain';
import { OrderResponse } from '../responses/order.response.dto';
import { PaymentResponse } from '../responses/payment.response.dto';
import { ResponseDto } from '../responses/response.dto';

@QueryHandler(FindAllOrdersQuery)
export class FindAllOrdersQueryHandler
  implements IQueryHandler<FindAllOrdersQuery, ResponseDto<OrderResponse[]>>
{
  constructor(
    @Inject('IOrderUnitOfWork')
    private readonly uow: IOrderUnitOfWork
  ) {}

  async execute(
    query: FindAllOrdersQuery
  ): Promise<ResponseDto<OrderResponse[]>> {
    const repo = this.uow.orderRepository;
    const orders = await repo.findMany({
      where: {
        customerId: query.customerId,
      },
      relations: ['payments']
    });

    const response = orders.map((order) => {
      const payments = (order.payments ?? []).map(
        (payment) =>
          new PaymentResponse(
            payment.voucherId,
            payment.status,
            payment.createdAt,
            payment.updatedAt
          )
      );

      return new OrderResponse(
        order.id,
        order.total,
        order.createdAt,
        order.updatedAt,
        payments
      );
    });

    return ResponseDto.ok(response);
  }
}
