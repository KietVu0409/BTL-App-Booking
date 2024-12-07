import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerFavoriteAccommodation } from './customer-favorite-accommodation.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(CustomerFavoriteAccommodation)
    private favoriteRepo: Repository<CustomerFavoriteAccommodation>,
  ) {}

  // Thêm accommodation vào danh sách yêu thích
  async addFavorite(customerId: number, accommodationId: number) {
    const existingFavorite = await this.favoriteRepo.findOne({
      where: {
        customer: { customer_id: customerId },
        accommodation: { accommodation_id: accommodationId },
      },
    });

    if (existingFavorite) {
      return { message: 'Accommodation is already in the favorite list.' };
    }

    const favorite = this.favoriteRepo.create({
      customer: { customer_id: customerId },
      accommodation: { accommodation_id: accommodationId },
    });

    return this.favoriteRepo.save(favorite);
  }

  // Lấy danh sách yêu thích của khách hàng
  async getFavorites(customerId: number) {
    return this.favoriteRepo.find({
      where: { customer: { customer_id: customerId } },
      relations: ['accommodation'],
    });
  }

  // Xóa accommodation khỏi danh sách yêu thích
  async removeFavorite(customerId: number, accommodationId: number) {
    const favorite = await this.favoriteRepo.findOne({
      where: {
        customer: { customer_id: customerId },
        accommodation: { accommodation_id: accommodationId },
      },
    });

    if (!favorite) {
      return { message: 'Accommodation is not in the favorite list.' };
    }

    await this.favoriteRepo.remove(favorite);
    return { message: 'Accommodation removed from the favorite list.' };
  }
}
