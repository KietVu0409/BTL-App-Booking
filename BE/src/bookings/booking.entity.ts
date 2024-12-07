import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Accommodation } from '../accommodations/accommodation.entity';
import { Customer } from '../customers/customer.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  booking_id: number;

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.bookings)
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation;

  @ManyToOne(() => Customer, (customer) => customer.bookings)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column('date')
  check_in_date: string;

  @Column('date')
  check_out_date: string;

  @Column('decimal')
  total_price: number;
}
