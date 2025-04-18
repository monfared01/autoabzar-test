import { EntityManager } from 'typeorm';
import { IGenericRepository } from './generic-repository.interface';

export interface IUnitOfWork {
  start(): Promise<void>;
  complete(): Promise<void>;
  rollback(): Promise<void>;

  getRepository<T>(entity: new () => T): IGenericRepository<T>;
  readonly manager: EntityManager;
}
