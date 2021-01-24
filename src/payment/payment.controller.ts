import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { PaymentService } from './payment.service';
import { PaymentEntity } from './repositories/payment.entity';
import { GetPaymentDto, CreatePaymentDto, UpdatePaymentDto } from './dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern({ role: 'payment', cmd: 'get' })
  async getPaymentById(getPaymentDto: GetPaymentDto): Promise<PaymentEntity> {
    return this.paymentService.getPaymentById(getPaymentDto);
  }

  @MessagePattern({ role: 'payment', cmd: 'create' })
  async createPayment(
    createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentEntity> {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @MessagePattern({ role: 'payment', cmd: 'update' })
  async updatePayment(
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<PaymentEntity> {
    return this.paymentService.updatePayment(updatePaymentDto);
  }
}
