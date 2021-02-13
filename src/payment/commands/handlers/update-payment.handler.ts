import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { UpdatePaymentCommand } from '../impl';
import { PaymentRepository } from '../../../db/repositories/payment.repository';
import { RpcExceptionService } from 'src/utils/exception-handling';

@CommandHandler(UpdatePaymentCommand)
export class UpdatePaymentHandler
  implements ICommandHandler<UpdatePaymentCommand> {
  constructor(
    @InjectRepository(PaymentRepository)
    private readonly paymentRepository: PaymentRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(command: UpdatePaymentCommand) {
    const { id, updatedPayment } = command.updatePaymentDto;
    const { newPayment, booking } = updatedPayment;
    const { booking_id } = newPayment;
    if (!booking) {
      this.rpcExceptionService.throwNotFound('Booking does not exist');
    }

    try {
      await this.paymentRepository.update({ id }, { booking_id });

      const payment = await this.paymentRepository.findOne(id);

      return payment;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
