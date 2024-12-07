import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Location } from '../locations/location.entity';

@Entity()
export class LocationType {
  @PrimaryGeneratedColumn()
  location_type_id: number;

  @Column({ unique: true })
  type: string; // 'beach', 'mountain', 'island', 'camping'

  @Column()
  image_url: string;

  @OneToMany(() => Location, (location) => location.location_type)
  locations: Location[];
}
