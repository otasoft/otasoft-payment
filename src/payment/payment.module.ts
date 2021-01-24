import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommandHandlers } from './commands/handlers';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { QueryHandlers } from './queries/handlers';
import { PaymentEntity } from './repositories/payment.entity';
import { PaymentRepository } from './repositories/payment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentRepository, PaymentEntity]),
    CqrsModule,
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    ConfigService,
    ...QueryHandlers,
    ...CommandHandlers,
  ],
})
export class PaymentModule {}
