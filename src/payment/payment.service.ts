import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreatePaymentCommand } from './commands/impl';
import { UpdatePaymentCommand } from './commands/impl/update-payment.command';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { GetPaymentDto } from './dto/get-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
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
    console.log({ createPaymentDto });
    return this.commandBus.execute(new CreatePaymentCommand(createPaymentDto));
  }

  async updatePayment(
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<PaymentEntity> {
    return this.commandBus.execute(new UpdatePaymentCommand(updatePaymentDto));
  }
}
