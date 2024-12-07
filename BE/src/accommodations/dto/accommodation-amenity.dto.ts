import { IsNumber, IsString } from 'class-validator';

export class AccommodationAmenityDTO {
  @IsNumber()
  amenity_id: number;

  @IsString()
  name: string;
}
