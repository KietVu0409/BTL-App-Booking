import { IsNumber, IsString } from 'class-validator';

export class AmenityDTO {
  @IsNumber()
  amenity_id: number;

  @IsString()
  name: string;

  @IsString()
  image_url: string;
}
