import { IsNumber, IsString, IsArray, IsOptional } from 'class-validator';
import { AmenityDTO } from '../../amenities/dto/amenity.dto';
import { AccommodationPromotionDTO } from './accommodation-promotion.dto';

export class AccommodationDTO {
  @IsNumber()
  accommodation_id: number;

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  price_per_night: number;

  @IsNumber()
  rating: number;

  @IsNumber()
  max_guests: number;

  @IsString()
  description: string;

  @IsString()
  address: string;

  @IsString()
  image_url: string;

  @IsArray()
  @IsOptional()
  amenities: AmenityDTO[];

  @IsArray()
  @IsOptional()
  promotions: AccommodationPromotionDTO[];
}
