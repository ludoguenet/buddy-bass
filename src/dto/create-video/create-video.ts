import { IsString, IsOptional } from 'class-validator';

export class CreateVideo {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  link: string;
}
