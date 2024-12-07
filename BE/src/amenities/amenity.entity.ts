import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Accommodation } from '../accommodations/accommodation.entity';

@Entity()
export class Amenity {
  @PrimaryGeneratedColumn()
  amenity_id: number;

  @Column()
  name: string;

  @Column()
  image_url: string;

  @ManyToMany(() => Accommodation, (accommodation) => accommodation.amenities)
  accommodations: Accommodation[];
}
