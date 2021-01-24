import { GetPaymentDto } from '../../dto';

export class GetPaymentQuery {
  constructor(public readonly getPaymentDto: GetPaymentDto) {}
}
