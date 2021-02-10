import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import { CommandHandlers } from './commands/handlers';
import { StripeChargeService } from './stripeCharge.service';
import { RpcExceptionService } from 'src/utils/exception-handling';

@Module({
  imports: [
    CqrsModule,
  ],
  controllers: [],
  providers: [
    StripeChargeService,
    ConfigService,
    RpcExceptionService,
    ...CommandHandlers,
  ],
})
export class PaymentModule {}
