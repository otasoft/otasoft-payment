import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateChargeCommand } from './commands/impl';
import { CreateChargeDto } from './dto';

@Injectable()
export class StripeChargeService {
  constructor(private readonly commandBus: CommandBus) {}

  async createCharge(createChargeDto: CreateChargeDto): Promise<any> {
    return this.commandBus.execute(new CreateChargeCommand(createChargeDto));
  }
}
