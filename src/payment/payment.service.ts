import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreatePaymentCommand, UpdatePaymentCommand } from './commands/impl';
import { CreatePaymentDto, GetPaymentDto, UpdatePaymentDto } from './dto';
import { GetPaymentQuery } from './queries/impl';
import { PaymentEntity } from './repositories/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getPaymentById(getPaymentDto: GetPaymentDto): Promise<PaymentEntity> {
    return this.queryBus.execute(new GetPaymentQuery(getPaymentDto));
  }

  //TODO: getPaymentsByCustomerId
  //TODO: getPaymentsByBookingId

  async createPayment(
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentEntity> {
    return this.commandBus.execute(new CreatePaymentCommand(createPaymentDto));
  }

  async updatePayment(
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<PaymentEntity> {
    return this.commandBus.execute(new UpdatePaymentCommand(updatePaymentDto));
  }
}
