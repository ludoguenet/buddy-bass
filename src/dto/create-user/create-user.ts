import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUser {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lastName: string;
}
