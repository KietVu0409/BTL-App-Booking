import { IsOptional, IsEnum } from 'class-validator';

export class FilterAccommodationByTypeDto {
  @IsOptional()
  @IsEnum(['hotel', 'resort', 'homestay', 'camping'])
  type?: string;
}
