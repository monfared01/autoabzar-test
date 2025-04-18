import { Injectable } from '@nestjs/common';
import { GenericRepository } from '@autoabzar-test/tools';
import { SessionEntity } from '../persistence/session.entity';
import { Repository } from 'typeorm';
import { ISessionRepository, Session } from '@autoabzar-test/customer-domain';

@Injectable()
export class SessionRepository
  extends GenericRepository<SessionEntity>
  implements ISessionRepository
{
  constructor(repository: Repository<SessionEntity>) {
    super(repository);
  }

  async findBytoken(token: string): Promise<Session | null> {
    const session = await this.repository.findOne({
      where: { refreshToken: token },
    });

    if (!session) return null;

    return this.toDomain(session);
  }

  private toDomain(entity: SessionEntity): Session {
    return entity.toDomain();
  }
}
