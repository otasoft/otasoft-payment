import { GetPaymentDto } from '../../dto/get-payment.dto';

export class GetPaymentQuery {
  constructor(public readonly getPaymentDto: GetPaymentDto) {}
}
