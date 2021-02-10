import { CreateChargeDto } from '../../dto';

export class CreateChargeCommand {
  constructor(public readonly createChargeDto: CreateChargeDto) {}
}
