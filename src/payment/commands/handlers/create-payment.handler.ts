import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { CreatePaymentCommand } from '../impl';
import { PaymentRepository } from '../../../db/repositories/payment.repository';
import { RpcExceptionService } from '../../../utils/exception-handling';
import { StripeChargeService } from '../../../stripeCharge/stripeCharge.service';

const defaultCurrency = 'pln'

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
    const { newPayment, booking } = command.createPaymentDto;
    const { booking_id } = newPayment
    if (!booking) {
      this.rpcExceptionService.throwNotFound('Booking does not exist')
    }

    const payment = this.paymentRepository.create();

    payment.booking_id = booking_id;
    payment.created_at = new Date();
    payment.amount = newPayment.amount
    payment.currency = defaultCurrency

    const {id: stripeId, status: stripeStatus} = await this.stripeChargeService.createCharge({amount: payment.amount, currency: defaultCurrency, card_token: newPayment.card_token, metadata: {booking_id}})

    payment.stripe_id = stripeId
    payment.stripe_status = stripeStatus

    try {
      await payment.save();
      return payment;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
