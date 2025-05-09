import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

config();

const isTs = path.extname(__filename) === '.ts';

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env['DB_HOST'] || 'localhost',
  port: parseInt(process.env['DB_PORT'] as string, 10) || 5432,
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
  synchronize: false,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(process.env['DB_SSL_CA_PATH'] as string).toString(),
  },
  entities: [
    isTs
      ? 'libs/**/infrastructure/**/*.entity.ts'
      : 'dist/libs/**/infrastructure/**/*.entity.js',
  ],
  // migrations: ['libs/shared/db/src/connection/migrations/*.ts'],
};

export default new DataSource(dataSourceConfig);
