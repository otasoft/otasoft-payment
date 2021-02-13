import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { StripeModule } from 'nestjs-stripe';

import { CommandHandlers } from './commands/handlers';
import { StripeChargeService } from './stripeCharge.service';
import { RpcExceptionService } from 'src/utils/exception-handling';

@Module({
  imports: [
    CqrsModule,
    StripeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_API_KEY'),
        apiVersion: configService.get('STRIPE_API_VERSION'),
      }),
    }),
  ],
  controllers: [],
  providers: [
    StripeChargeService,
    ConfigService,
    ...CommandHandlers,
  ],
})
export class StripeChargeModule {}
