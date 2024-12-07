import { IsNumber, IsString, IsDateString } from 'class-validator';

export class AccommodationPromotionDTO {
  @IsNumber()
  promotion_id: number;

  @IsString()
  name: string;

  @IsNumber()
  discount_percentage: number;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;
}
