import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Location } from '../locations/location.entity';
import { AccommodationPromotion } from '../accommodations/accommodation-promotions.entity';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  promotion_id: number;

  @Column()
  name: string;

  @Column('decimal')
  discount_percentage: number;

  @Column('date')
  start_date: string;

  @Column('date')
  end_date: string;

  @ManyToOne(() => Location, (location) => location.promotions)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Column({
    type: 'enum',
    enum: ['hotel', 'resort', 'homestay', 'camping'],
    nullable: true,
  })
  accommodation_type: string;

  @OneToMany(
    () => AccommodationPromotion,
    (accommodationPromotion) => accommodationPromotion.promotion,
  )
  accommodations: AccommodationPromotion[];
}
