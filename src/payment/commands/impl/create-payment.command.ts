import { CreatePaymentDto } from '../../dto';

export class CreatePaymentCommand {
  constructor(public readonly createPaymentDto: CreatePaymentDto) {}
}
