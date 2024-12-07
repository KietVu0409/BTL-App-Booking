import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Accommodation } from '../accommodations/accommodation.entity';
import { Customer } from '../customers/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Accommodation, Customer])],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
