import { Controller } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { MessagePattern } from '@nestjs/microservices';

import { PaymentService } from './payment.service';
import { PaymentEntity } from './repositories/payment.entity';
import { GetPaymentDto } from './dto/get-payment.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern({ role: 'payment', cmd: 'get' })
  async getPaymentById(
    @Body() getPaymentDto: GetPaymentDto,
  ): Promise<PaymentEntity> {
    return this.paymentService.getPaymentById(getPaymentDto);
  }

  @MessagePattern({ role: 'payment', cmd: 'create' })
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentEntity> {
    return this.paymentService.createPayment(createPaymentDto);
  }

  @MessagePattern({ role: 'payment', cmd: 'update' })
  async updatePayment(
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Promise<PaymentEntity> {
    return this.paymentService.updatePayment(updatePaymentDto);
  }
}
