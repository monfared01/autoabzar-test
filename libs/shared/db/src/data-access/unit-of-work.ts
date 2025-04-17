import { DataSource, EntityManager, EntityTarget } from 'typeorm';
import { IUnitOfWork } from './unit-of-work.interface';
import { IGenericRepository } from './generic-repository.interface';

export abstract class UnitOfWork implements IUnitOfWork {
  private _manager!: EntityManager;

  constructor(private readonly dataSource: DataSource) {}

  get manager(): EntityManager {
    return this._manager;
  }

  async start(): Promise<void> {
    this._manager = this.dataSource.createEntityManager();
    await this._manager.queryRunner?.startTransaction();
  }

  async complete(): Promise<void> {
    await this._manager.queryRunner?.commitTransaction();
    await this._manager.queryRunner?.release();
  }

  async rollback(): Promise<void> {
    await this._manager.queryRunner?.rollbackTransaction();
    await this._manager.queryRunner?.release();
  }

  abstract getRepository<T>(entity: EntityTarget<T>): IGenericRepository<T>;
}
