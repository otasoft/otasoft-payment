import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { PaymentRepository } from '../../../db/repositories/payment.repository';
import { GetPaymentQuery } from '../impl';
import { RpcExceptionService } from '../../../utils/exception-handling';

@QueryHandler(GetPaymentQuery)
export class GetPaymentHandler implements IQueryHandler<GetPaymentQuery> {
  constructor(
    @InjectRepository(PaymentRepository)
    private readonly paymentRepository: PaymentRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(query: GetPaymentQuery) {
    const id = query.getPaymentDto;
    const payment = await this.paymentRepository.findOne(id);

    if (!payment) {
      this.rpcExceptionService.throwNotFound('Payment does not exist');
    }

    return payment;
  }
}
