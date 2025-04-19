import { EntityManager } from 'typeorm';

export interface IUnitOfWork {
  start(): Promise<void>;
  complete(): Promise<void>;
  rollback(): Promise<void>;
  readonly manager: EntityManager;
}
