import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Session } from '@autoabzar-test/customer-domain';
import { DecoratedEntity } from '@autoabzar-test/tools';
import { CustomerEntity } from './customer.entity';

@Entity('sessions')
export class SessionEntity extends DecoratedEntity {
  @ManyToOne(() => CustomerEntity, (customer) => customer.sessions, {
    lazy: true,
  })
  @JoinColumn({ name: 'customerId' })
  customer: Promise<CustomerEntity>;

  @Column()
  customerId: number;

  @Column()
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  expiresAt: Date;

  @Column({ default: false })
  isRevoked: boolean;

  static fromDomain(session: Session): SessionEntity {
    const entity = new SessionEntity();
    entity.id = session.id;
    entity.customerId = session.customerId;
    entity.refreshToken = session.refreshToken;
    entity.createdAt = session.createdAt;
    entity.expiresAt = session.expiresAt;
    entity.isRevoked = session.isRevoked;
    return entity;
  }

  toDomain(): Session {
    return new Session(
      this.id,
      this.customerId,
      this.refreshToken,
      this.createdAt,
      this.expiresAt,
      this.isRevoked
    );
  }
}
