import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { PaymentRepository } from '../../repositories/payment.repository';
import { GetPaymentQuery } from '../impl';

@QueryHandler(GetPaymentQuery)
export class GetPaymentHandler implements IQueryHandler<GetPaymentQuery> {
  constructor(
    @InjectRepository(PaymentRepository)
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async execute(query: GetPaymentQuery) {
    const id = query.getPaymentDto;
    const payment = await this.paymentRepository.findOne({ where: { id } });

    if (!payment) {
      throw new RpcException({
        statusCode: 404,
        errorStatus: 'Payment does not exist',
      });
    }

    return payment;
  }
}
