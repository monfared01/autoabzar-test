import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IPasswordTools } from '@autoabzar-test/customer-domain';

@Injectable()
export class PasswordTools implements IPasswordTools {
  constructor(private readonly saltRounds: number) {}

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
