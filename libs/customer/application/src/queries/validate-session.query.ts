import { IQuery } from '@nestjs/cqrs';

export class ValidateSessionQuery implements IQuery {
  constructor(public readonly accessToken: string) {}
}
