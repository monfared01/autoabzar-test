import { Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * @description This is our "base class" for all entities that will be used with our GenericRepository
 */
@Entity()
export abstract class DecoratedEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
