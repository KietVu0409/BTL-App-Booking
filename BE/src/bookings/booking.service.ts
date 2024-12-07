import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Accommodation } from '../accommodations/accommodation.entity';
import { Customer } from '../customers/customer.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Accommodation)
    private readonly accommodationRepository: Repository<Accommodation>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const booking = this.bookingRepository.create(createBookingDto);

    // Explicitly set the accommodation and customer relationships
    booking.accommodation = await this.accommodationRepository.findOne({ where: { accommodation_id: createBookingDto.accommodation_id } });
    booking.customer = await this.customerRepository.findOne({ where: { customer_id: createBookingDto.customer_id } });

    return this.bookingRepository.save(booking);
  }

  // Tìm booking theo customer_id
  async findByCustomerId(customerId: number): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { customer: { customer_id: customerId } },
      relations: ['accommodation', 'customer'], // Bao gồm thông tin liên quan
    });
  }
}