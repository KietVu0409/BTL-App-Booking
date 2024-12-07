import { IsString, IsPhoneNumber, MinLength } from 'class-validator';

export class RegisterCustomerDto {
  @IsString()
  @MinLength(6)
  name: string;

  @IsPhoneNumber()
  phone_number: string;

  @IsString()
  @MinLength(12)
  password: string;
}
