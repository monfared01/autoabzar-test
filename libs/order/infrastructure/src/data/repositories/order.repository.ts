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

  async findByCustomerId(customerId: number): Promise<Order | null> {
    const entity = await this.repository.findOne({ where: { customerId } });
    return entity ? this.toDomain(entity) : null;
  }

  private toDomain(entity: OrderEntity): Order {
    return entity.toDomain();
  }
}
