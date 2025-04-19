import { DataSource, EntityManager } from 'typeorm';
import { IUnitOfWork } from './unit-of-work.interface';

export abstract class UnitOfWork implements IUnitOfWork {
  private _manager!: EntityManager;

  constructor(private readonly dataSource: DataSource) {
    this._manager = this.dataSource.manager;
  }

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
}
