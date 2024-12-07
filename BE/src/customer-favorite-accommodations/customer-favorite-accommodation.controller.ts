import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { FavoriteService } from './customer-favorite-accommodation.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  // Endpoint để thêm accommodation vào danh sách yêu thích
  @Post('add')
  async addFavorite(@Body() addFavoriteDto: AddFavoriteDto) {
    return this.favoriteService.addFavorite(
      addFavoriteDto.customerId,
      addFavoriteDto.accommodationId,
    );
  }

  // Endpoint để lấy danh sách yêu thích của khách hàng
  @Get(':customerId')
  async getFavorites(@Param('customerId') customerId: number) {
    return this.favoriteService.getFavorites(customerId);
  }

  // Xóa một accommodation khỏi danh sách yêu thích
  @Delete(':customerId/:accommodationId')
  async removeFavorite(
    @Param('customerId') customerId: number,
    @Param('accommodationId') accommodationId: number,
  ) {
    return this.favoriteService.removeFavorite(customerId, accommodationId);
  }
}
