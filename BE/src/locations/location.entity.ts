import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LocationType } from '../location-types/location-type.entity';
import { Accommodation } from '../accommodations/accommodation.entity';
import { Promotion } from '../promotions/promotion.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  location_id: number;

  @Column()
  name: string;

  @Column()
  image_url: string;

  @ManyToOne(() => LocationType)
  @JoinColumn({ name: 'location_type_id' })
  location_type: LocationType;

  @OneToMany(() => Accommodation, (accommodation) => accommodation.location)
  accommodations: Accommodation[];

  @OneToMany(() => Promotion, (promotion) => promotion.location)
  promotions: Promotion[];
}
