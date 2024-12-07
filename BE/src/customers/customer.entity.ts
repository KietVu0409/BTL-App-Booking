import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../bookings/booking.entity';
import { Rating } from '../ratings/rating.entity';
import { CustomerFavoriteAccommodation } from '../customer-favorite-accommodations/customer-favorite-accommodation.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column()
  name: string;

  @Column()
  phone_number: string;

  @Column()
  password: string; // Thêm cột password để lưu mật khẩu người dùng

  @OneToMany(() => Booking, (booking) => booking.customer)
  bookings: Booking[];

  @OneToMany(() => Rating, (rating) => rating.customer)
  ratings: Rating[];

  @OneToMany(
    () => CustomerFavoriteAccommodation,
    (favorite) => favorite.customer,
  )
  favorites: CustomerFavoriteAccommodation[];
}
