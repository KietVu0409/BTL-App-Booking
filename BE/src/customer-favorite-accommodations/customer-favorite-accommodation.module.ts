import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteService } from './customer-favorite-accommodation.service';
import { FavoriteController } from './customer-favorite-accommodation.controller';
import { CustomerFavoriteAccommodation } from './customer-favorite-accommodation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerFavoriteAccommodation])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
