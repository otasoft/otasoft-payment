import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { CreatePaymentCommand } from '../impl';
import { PaymentRepository } from '../../../db/repositories/payment.repository';
import { RpcExceptionService } from 'src/utils/exception-handling';
import { StripeChargeService } from 'src/stripeCharge/stripeCharge.service';

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler
  implements ICommandHandler<CreatePaymentCommand> {
  constructor(
    @InjectRepository(PaymentRepository)
    private readonly paymentRepository: PaymentRepository,
    private readonly rpcExceptionService: RpcExceptionService,
    private readonly stripeChargeService: StripeChargeService
  ) {}

  async execute(command: CreatePaymentCommand) {
    const { newPayment, booking, cardToken } = command.createPaymentDto;
    const { booking_id } = newPayment
    if (!booking) {
      this.rpcExceptionService.throwNotFound('Booking does not exist')
    }

    const payment = await this.paymentRepository.create();

    payment.booking_id = booking_id;
    payment.created_at = new Date();
    payment.amount = newPayment.amount
    payment.currency = newPayment.currency

    await this.stripeChargeService.createCharge({amount: payment.amount, currency: payment.currency, cardToken})

    try {
      await payment.save();
      return payment;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
