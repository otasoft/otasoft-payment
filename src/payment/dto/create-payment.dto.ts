import { IsLowercase, IsNumber, IsString, Length } from 'class-validator';

class Payment {
  @IsNumber()
  booking_id: number;

  @IsNumber()
  amount: number;

  // TODO: maybe we should have a list of valid currencies in the db
  @IsString()
  @Length(3, 3)
  @IsLowercase()
  currency: string;
}

class Booking {}

export class CreatePaymentDto {
  newPayment: Payment;
  booking: Booking;

  @IsString()
  cardToken: string;
}
