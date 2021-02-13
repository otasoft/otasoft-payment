import { IsEnum, IsNumber, IsString } from 'class-validator';
import { currencies } from '../constants/constants';

class Payment {
  @IsNumber()
  booking_id: number;

  @IsNumber()
  amount: number;

  @IsEnum(currencies)
  currency: string;

  @IsString()
  card_token: string;
}

class Booking {}

export class CreatePaymentDto {
  newPayment: Payment;
  booking: Booking;
}
