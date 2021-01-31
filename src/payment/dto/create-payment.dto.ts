import { IsNumber } from 'class-validator';

class Payment {
  @IsNumber()
  booking_id: number;
}

class Booking {}

export class CreatePaymentDto {
  newPayment: Payment;
  booking: Booking;
}
