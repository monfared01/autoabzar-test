import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { DbModule } from '@autoabzar-test/db';
import { CustomerUnitOfWork } from './data/unit-of-work';
import { PasswordTools } from './tools/password.tools';
import { TokenTools } from './tools/token.tools';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './data/persistence/customer.entity';
import { SessionEntity } from './data/persistence/session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity, SessionEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '60s'),
        },
      }),
      inject: [ConfigService],
    }),
    DbModule,
  ],
  providers: [
    CustomerUnitOfWork,
    {
      provide: 'ICustomerUnitOfWork',
      useExisting: CustomerUnitOfWork,
    },

    TokenTools,
    {
      provide: 'ITokenTools',
      useExisting: TokenTools,
    },
    {
      provide: 'BCRYPT_SALT_ROUNDS',
      useFactory: (configService: ConfigService) =>
        parseInt(configService.get<string>('BCRYPT_SALT_ROUNDS', '10'), 10),
      inject: [ConfigService],
    },
    {
      provide: 'IPasswordTools',
      useFactory: (saltRounds: number) => new PasswordTools(saltRounds),
      inject: ['BCRYPT_SALT_ROUNDS'],
    },
  ],
  exports: ['ITokenTools', 'IPasswordTools', 'ICustomerUnitOfWork'],
})
export class CustomerInfrastructureModule {}
