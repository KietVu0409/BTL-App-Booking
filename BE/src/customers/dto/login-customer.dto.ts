import { IsPhoneNumber, IsString } from 'class-validator';

export class LoginCustomerDto {
  @IsPhoneNumber()
  phone_number: string;

  @IsString()
  password: string;
}
