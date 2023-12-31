import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  author: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  user: User;
}
