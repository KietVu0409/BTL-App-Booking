import { IsString } from 'class-validator';
export class GetBookingsDto {
  @IsString()
  customerId: string;
}
