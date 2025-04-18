import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from '@autoabzar-test/order-domain';
import { CustomerEntity } from '@autoabzar-test/customer-infrastructure';

@Entity('orders')
export class OrderEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  customerId: string;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customerId' })
  customer: CustomerEntity;

  @Column()
  total: number;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  static fromDomain(order: Order): OrderEntity {
    const entity = new OrderEntity();
    entity.id = order.id;
    entity.customerId = order.customerId;
    entity.total = order.total;
    entity.createdAt = order.createdAt;
    return entity;
  }

  toDomain(): Order {
    return new Order(this.id, this.customerId, this.total, this.createdAt);
  }
}
