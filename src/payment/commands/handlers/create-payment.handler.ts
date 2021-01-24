import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { CreatePaymentCommand } from '../impl';
import { PaymentRepository } from '../../../db/repositories/payment.repository';

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler
  implements ICommandHandler<CreatePaymentCommand> {
  constructor(
    @InjectRepository(PaymentRepository)
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async execute(command: CreatePaymentCommand) {
    const { customer_id, booking_id } = command.createPaymentDto;
    // TODO: add booking validation

    const payment = await this.paymentRepository.create();

    payment.booking_id = booking_id;
    payment.customer_id = customer_id;
    payment.created_at = new Date();

    try {
      await payment.save();
      return payment;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
