import { Transport } from '@nestjs/microservices';

export const paymentMicroserviceOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [
      `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_NODENAME}:${process.env.RABBITMQ_FIRST_HOST_PORT}/${process.env.RABBITMQ_DEFAULT_VHOST}`,
    ],
    queue: 'payment_queue',
    queueOptions: {
      durable: false,
    },
  },
};
