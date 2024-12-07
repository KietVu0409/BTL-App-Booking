import { IsNotEmpty, IsDateString, IsDecimal } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  accommodation_id: number;

  @IsNotEmpty()
  customer_id: number;

  @IsDateString()
  check_in_date: string;

  @IsDateString()
  check_out_date: string;

  @IsDecimal()
  total_price: number;
}
