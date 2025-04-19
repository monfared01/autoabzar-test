import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '@autoabzar-test/order-domain';
import { CustomerEntity } from '@autoabzar-test/customer-infrastructure';
import { DecoratedEntity } from '@autoabzar-test/tools';

@Entity('orders')
export class OrderEntity extends DecoratedEntity {
  @Column()
  customerId: number;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customerId' })
  customer: CustomerEntity;

  @Column()
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static fromDomain(order: Order): OrderEntity {
    const entity = new OrderEntity();
    entity.id = order.id;
    entity.customerId = order.customerId;
    entity.total = order.total;
    entity.createdAt = order.createdAt;
    return entity;
  }

  toDomain(): Order {
    return new Order(
      this.id,
      this.customerId,
      this.total,
      this.createdAt,
      this.updatedAt
    );
  }
}
