import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import Stripe from 'stripe'
import { InjectStripe } from 'nestjs-stripe';

import { CreateChargeCommand } from '../impl';

@CommandHandler(CreateChargeCommand)
export class CreateChargeHandler
  implements ICommandHandler<CreateChargeCommand> {
  constructor(
    @InjectStripe() 
    private readonly stripeClient: Stripe
  ) {}

  async execute(command: CreateChargeCommand) {
    this.stripeClient.charges.create({
      amount: command.createChargeDto.amount,
      currency: command.createChargeDto.currency,
      source: command.createChargeDto.cardToken
    })
  }
}
