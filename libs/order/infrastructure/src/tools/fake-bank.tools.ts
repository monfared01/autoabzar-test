import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IFakeBankTools } from '@autoabzar-test/order-domain';

@Injectable()
export class FakeBankTools implements IFakeBankTools {
  async createVoucherId(total: number): Promise<string> {
    // For simulation, we're ignoring total and just returning a UUID
    return uuidv4();
  }

  async verifyPayment(voucherId: string): Promise<boolean> {
    // In a real case, you'd check status with a provider.
    // Here we simulate it always being successful
    return true;
  }
}
