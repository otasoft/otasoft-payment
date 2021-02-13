import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { StripeChargeService } from './stripeCharge.service';

describe('StripeChargeService', () => {
  let service: StripeChargeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [StripeChargeService],
    }).compile();

    service = module.get<StripeChargeService>(StripeChargeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
