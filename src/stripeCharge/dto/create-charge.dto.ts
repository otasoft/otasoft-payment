import { IsEmail, IsNumber, IsOptional, IsString, Length, IsLowercase, ValidateNested } from 'class-validator';

class StripeMetadata {
  @IsNumber()
  booking_id: number;
}

export class CreateChargeDto {
  @IsNumber()
  amount: number;

  // TODO: maybe we should have a list of valid currencies in the db
  @IsString()
  @Length(3, 3)
  @IsLowercase()
  currency: string;

  @IsOptional()
  @IsEmail()
  receipt_email?: string;

  @IsString()
  card_token: string;

  @ValidateNested()
  metadata: StripeMetadata;
}
