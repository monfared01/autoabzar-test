import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { ITokenTools } from '@autoabzar-test/customer-domain';

@Injectable()
export class TokenTools implements ITokenTools {
  constructor(private readonly jwtService: JwtService) {}

  async encode(
    payload: { userId: number },
  ): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async decode<T>(token: string, ignoreExpiration: boolean): Promise<T> {
    return this.jwtService.verifyAsync(token, {
      ignoreExpiration,
    }) as Promise<T>;
  }

  generateGuid(): string {
    return uuidv4();
  }
}
