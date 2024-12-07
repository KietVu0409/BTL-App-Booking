import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './booking.entity';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // Tạo mới booking
  @Post()
  async create(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    console.log(createBookingDto);
    return this.bookingService.create(createBookingDto);
  }

  // Tìm booking theo customer_id
  @Get('customer/:customerId')
  async findByCustomerId(
    @Param('customerId') customerId: number,
  ): Promise<Booking[]> {
    return this.bookingService.findByCustomerId(customerId);
  }
}
