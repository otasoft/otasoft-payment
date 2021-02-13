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
    return this.stripeClient.charges.create({
      amount: command.createChargeDto.amount,
      currency: command.createChargeDto.currency,
      source: command.createChargeDto.card_token,
      receipt_email: command.createChargeDto.receipt_email,
      metadata: command.createChargeDto.metadata as unknown as Stripe.MetadataParam,
    })
  }
}
