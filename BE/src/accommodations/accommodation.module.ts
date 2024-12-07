import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationService } from './accommodation.service';
import { AccommodationController } from './accommodation.controller';
import { Accommodation } from './accommodation.entity';
import { AccommodationPromotion } from './accommodation-promotions.entity';
import { Location } from '../locations/location.entity';
import { LocationType } from '../location-types/location-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Accommodation,
      Location,
      LocationType,
      AccommodationPromotion,
    ]),
  ],
  providers: [AccommodationService],
  controllers: [AccommodationController],
})
export class AccommodationModule {}
