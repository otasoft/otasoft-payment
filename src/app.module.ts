import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DbModule } from './db/db.module';
import { PaymentModule } from './payment/payment.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [ConfigModule.forRoot(), DbModule, PaymentModule, HealthModule],
})
export class AppModule {}
