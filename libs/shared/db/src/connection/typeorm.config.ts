import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

config();

const isTs = path.extname(__filename) === '.ts';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env['DB_HOST'] || 'localhost',
  port: parseInt(process.env['DB_PORT'] as string, 10) || 5432,
  username: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  database: process.env['DB_NAME'],
  autoLoadEntities: true,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(process.env['DB_SSL_CA_PATH'] as string).toString(),
  },
  entities: [
    isTs
      ? 'libs/**/infrastructure/**/*.entity.ts'
      : 'dist/libs/**/infrastructure/**/*.entity.js',
  ],
  synchronize: process.env['NODE_ENV'] !== 'production',
};
