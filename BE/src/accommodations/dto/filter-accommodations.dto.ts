import { IsString } from 'class-validator';

export class FilterAccommodationsDto {
  @IsString()
  location_type: string;
}
