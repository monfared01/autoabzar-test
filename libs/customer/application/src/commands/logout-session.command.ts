import { ICommand } from '@nestjs/cqrs';

export class LogoutSessionCommand implements ICommand {
  constructor(public readonly userId: number) {}
}
