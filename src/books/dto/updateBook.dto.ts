import { IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';

export class updateBookDto {
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  author: string;
  @IsOptional()
  @IsNumber()
  price: number;
  user: User;
}
