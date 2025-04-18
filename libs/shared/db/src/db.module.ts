import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { dataSourceConfig } from './connection/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        const dataSource = new DataSource(dataSourceConfig);
        await dataSource.initialize(); 
        return dataSource;
      },
    },
  ],
  exports: [DataSource], 
})
export class DbModule {}
