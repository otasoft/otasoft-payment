import { CreatePaymentDto } from './create-payment.dto';

export class UpdatePaymentDto {
  id: number;
  updatedPayment: CreatePaymentDto;
}
