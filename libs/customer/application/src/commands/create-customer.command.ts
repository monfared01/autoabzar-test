import { ICommand } from '@nestjs/cqrs';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateCustomerCommand implements ICommand {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @MinLength(6)
  password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
