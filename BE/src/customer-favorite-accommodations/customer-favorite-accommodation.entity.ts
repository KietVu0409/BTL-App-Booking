import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from '../customers/customer.entity';
import { Accommodation } from '../accommodations/accommodation.entity';

@Entity()
export class CustomerFavoriteAccommodation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.favorites)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.favorites)
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation;
}
