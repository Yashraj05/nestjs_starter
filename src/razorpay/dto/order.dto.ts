import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
