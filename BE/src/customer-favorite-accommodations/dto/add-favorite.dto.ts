import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddFavoriteDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsNotEmpty()
  @IsNumber()
  accommodationId: number;
}
