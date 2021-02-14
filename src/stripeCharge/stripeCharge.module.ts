import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeModule } from 'nestjs-stripe';

import { StripeChargeService } from './stripeCharge.service';

@Module({
  imports: [
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
  providers: [StripeChargeService, ConfigService],
})
export class StripeChargeModule {}
