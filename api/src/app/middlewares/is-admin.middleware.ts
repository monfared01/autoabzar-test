import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IsAdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req['isAdmin']) {
      throw new ForbiddenException('Admins only');
    }

    next();
  }
}
