import { IGenericRepository } from '@autoabzar-test/tools';
import { Session } from '../../core/session';

export interface ISessionRepository extends IGenericRepository<Session> {
  findBytoken(token: string): Promise<Session | null>;
}
