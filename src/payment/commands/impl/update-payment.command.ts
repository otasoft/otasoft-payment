import { UpdatePaymentDto } from '../../dto';

export class UpdatePaymentCommand {
  constructor(public readonly updatePaymentDto: UpdatePaymentDto) {}
}
