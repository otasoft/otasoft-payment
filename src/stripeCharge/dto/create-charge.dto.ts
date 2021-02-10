import { IsEmail, IsNumber, IsOptional, IsString, Length, IsLowercase } from 'class-validator';

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
  cardToken: string;
}
