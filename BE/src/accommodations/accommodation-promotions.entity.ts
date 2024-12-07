import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Accommodation } from './accommodation.entity';
import { Promotion } from '../promotions/promotion.entity';

@Entity()
export class AccommodationPromotion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.promotions)
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation;

  @ManyToOne(() => Promotion, (promotion) => promotion.accommodations)
  @JoinColumn({ name: 'promotion_id' })
  promotion: Promotion;
}
