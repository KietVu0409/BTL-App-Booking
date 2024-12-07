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
export class Rating {
  @PrimaryGeneratedColumn()
  rating_id: number;

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.ratings)
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation;

  @ManyToOne(() => Customer, (customer) => customer.ratings)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column('decimal')
  rating: number;

  @Column('text')
  review: string;

  @Column('timestamp')
  created_at: string;
}
