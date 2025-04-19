import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { QueryBus } from '@nestjs/cqrs';
import { ValidateSessionQuery } from '@autoabzar-test/customer-application';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly queryBus: QueryBus) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid authorization header'
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const result = await this.queryBus.execute(
        new ValidateSessionQuery(token)
      );

      req['userId'] = result.userId;
      req['isAdmin'] = result.isAdmin;

      next();
    } catch {
      throw new UnauthorizedException();
    }
  }
}
