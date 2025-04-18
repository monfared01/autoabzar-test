import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { DecoratedEntity } from '@autoabzar-test/tools';
import { Customer } from '@autoabzar-test/customer-domain';
import { SessionEntity } from './session.entity';

@Entity('customers')
export class CustomerEntity extends DecoratedEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  isAdmin: boolean;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => SessionEntity, (session) => session.customer, { lazy: true })
  sessions: Promise<SessionEntity[]>;

  static fromDomain(customer: Customer): CustomerEntity {
    const entity = new CustomerEntity();
    entity.id = customer.id;
    entity.name = customer.name;
    entity.email = customer.email;
    entity.password = customer.password;
    entity.createdAt = customer.createdAt;
    entity.updatedAt = customer.updatedAt;
    return entity;
  }

  toDomain(): Customer {
    return new Customer(
      this.id,
      this.name,
      this.email,
      this.password,
      this.isAdmin,
      this.createdAt,
      this.updatedAt
    );
  }
}
