import { ICommand } from '@nestjs/cqrs';
import {
  IsEmail,
  IsInt,
  IsString,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class UpdateCustomerCommand implements ICommand {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsBoolean()
  isAdmin: boolean;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    isAdmin: boolean
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}
