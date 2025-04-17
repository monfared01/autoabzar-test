import {
  DeepPartial,
  DeleteResult,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  SaveOptions,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IGenericRepository<T> {
  readonly manager: EntityManager;

  findOne(options: FindOneOptions<T>): Promise<T | null>;

  findMany(options: FindManyOptions<T>): Promise<Array<T>>;

  findManyAndCount(options: FindManyOptions<T>): Promise<[Array<T>, number]>;

  create(data: DeepPartial<T>, saveOptions?: SaveOptions): Promise<T>;

  createMany(
    data: Array<DeepPartial<T>>,
    saveOptions?: SaveOptions
  ): Promise<Array<T>>;

  update(data: DeepPartial<T>, saveOptions?: FindOneOptions<T>): Promise<T>;

  updateMany(
    updateQuery: FindOptionsWhere<T>,
    data: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult>;

  rawQuery(query: string, parameters: unknown[]): Promise<Array<unknown>>;

  delete(query: FindOptionsWhere<T>): Promise<DeleteResult>;

  softDelete(query: FindOptionsWhere<T>): Promise<UpdateResult>;

  count(options?: FindManyOptions<T>): Promise<{ count: number }>;
}
