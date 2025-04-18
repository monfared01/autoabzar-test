import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import {
  CustomerEntity,
  SessionEntity,
} from '@autoabzar-test/customer-infrastructure';

config();

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env['DB_HOST'] || 'localhost',
  port: parseInt(process.env['DB_PORT'] as string, 10) || 5432,
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
  synchronize: false,
  entities: [CustomerEntity, SessionEntity],
  migrations: ['libs/shared/db/src/connection/migrations/*.ts'],
};

export default new DataSource(dataSourceConfig);
