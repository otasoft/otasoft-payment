import { IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  customer_id: number;

  @IsNumber()
  booking_id: number;
}
