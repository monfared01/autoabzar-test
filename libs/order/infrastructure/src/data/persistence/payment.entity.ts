import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DecoratedEntity } from '@autoabzar-test/tools';
import { OrderEntity } from './order.entity';
import { Payment } from '@autoabzar-test/order-domain';

@Entity('payments')
export class PaymentEntity extends DecoratedEntity {
  @Column()
  orderId: number;

  @ManyToOne(() => OrderEntity)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @Column()
  voucherId: string;

  @Column({
    type: 'enum',
    enum: ['success', 'failed', 'pending'],
    default: 'pending',
  })
  status: 'success' | 'failed' | 'pending';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  

  static fromDomain(payment: Payment): PaymentEntity {
    const entity = new PaymentEntity();
    entity.id = payment.id;
    entity.orderId = payment.orderId;
    entity.voucherId = payment.voucherId;
    entity.status = payment.status;
    entity.createdAt = payment.createdAt;
    entity.updatedAt = payment.updatedAt;
    return entity;
  }

  toDomain(): Payment {
    return new Payment(
      this.id,
      this.orderId,
      this.voucherId,
      this.status,
      this.createdAt,
      this.updatedAt
    );
  }
}
