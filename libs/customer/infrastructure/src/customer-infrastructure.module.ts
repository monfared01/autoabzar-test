import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { DbModule } from '@autoabzar-test/db';
import { CustomerUnitOfWork } from './data/unit-of-work';
import { PasswordTools } from './tools/password.tools';
import { TokenTools } from './tools/token.tools';

@Module({
  imports: [
    DbModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '60s'),
        },
      }),
      inject: [ConfigService],
    }),
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
  exports: ['ICustomerUnitOfWork', 'ITokenTools', 'IPasswordTools'],
})
export class CustomerInfrastructureModule {}
