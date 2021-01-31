import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { paymentMicroserviceOptions } from './microservice-connection/microservice-connection';

const logger = new Logger('PaymentMicroservice');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    paymentMicroserviceOptions,
  );

  await app.listen(() => {
    logger.log('Microservice is listening');
  });
}
bootstrap();
