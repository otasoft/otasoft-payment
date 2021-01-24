import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { UpdatePaymentCommand } from '../impl/update-payment.command';
import { PaymentRepository } from '../../repositories/payment.repository';

@CommandHandler(UpdatePaymentCommand)
export class UpdatePaymentHandler
  implements ICommandHandler<UpdatePaymentCommand> {
  constructor(
    @InjectRepository(PaymentRepository)
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async execute(command: UpdatePaymentCommand) {
    const { id, updatedPayment } = command.updatePaymentDto;
    const { customer_id, booking_id } = updatedPayment;

    try {
      await this.paymentRepository.update({ id }, { customer_id, booking_id });
      //TODO: validate booking

      const payment = await this.paymentRepository.findOne(id);
      return payment;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
