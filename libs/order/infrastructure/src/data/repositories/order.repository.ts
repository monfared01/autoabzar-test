import { Injectable } from '@nestjs/common';
import { GenericRepository } from '@autoabzar-test/tools';
import { OrderEntity } from '../persistence/order.entity';
import { Repository } from 'typeorm';
import { IOrderRepository, Order } from '@autoabzar-test/order-domain';

@Injectable()
export class OrderRepository
  extends GenericRepository<OrderEntity>
  implements IOrderRepository
{
  constructor(repository: Repository<OrderEntity>) {
    super(repository);
  }

  async findByCustomerId(customerId: number): Promise<Order[]> {
    const entities = await this.repository.find({ where: { customerId } });
    return entities.map((entity) => this.toDomain(entity));
  }

  private toDomain(entity: OrderEntity): Order {
    return entity.toDomain();
  }
}
