import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class StripeChargeService {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

}
