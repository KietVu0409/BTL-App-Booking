import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accommodation } from './accommodation.entity';
import { LocationType } from '../location-types/location-type.entity';
import { FilterAccommodationsDto } from './dto/filter-accommodations.dto';
import { FilterAccommodationByTypeDto } from './dto/filter-accommodation-by-type.dto';
import { Location } from '../locations/location.entity';
import { AccommodationPromotion } from './accommodation-promotions.entity';
import { AccommodationDTO } from './dto/accommodation.dto';

@Injectable()
export class AccommodationService {
  constructor(
    @InjectRepository(Accommodation)
    private readonly accommodationRepository: Repository<Accommodation>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(LocationType)
    private readonly locationTypeRepository: Repository<LocationType>,
    @InjectRepository(AccommodationPromotion)
    private accommodationPromotionRepository: Repository<AccommodationPromotion>,
  ) {}

  // Phương thức lọc accommodation theo location_type.type
  async getAccommodationsByLocationType(
    filterAccommodationsDto: FilterAccommodationsDto,
  ): Promise<Accommodation[]> {
    const { location_type } = filterAccommodationsDto;

    // Tìm locationType theo type
    const locationTypeEntity = await this.locationTypeRepository.findOne({
      where: { type: location_type },
    });

    if (!locationTypeEntity) {
      throw new Error('Invalid location type');
    }

    // Lọc accommodations theo locationTypeId
    return this.accommodationRepository.find({
      where: {
        location: {
          location_type: locationTypeEntity,
        },
      },
      relations: ['location', 'location.location_type'],
    });
  }

  // Phương thức lọc accommodation theo accommodation.type
  async filterAccommodations(
    filterAccommodationByTypeDto: FilterAccommodationByTypeDto,
  ): Promise<Accommodation[]> {
    const { type } = filterAccommodationByTypeDto;

    const query =
      this.accommodationRepository.createQueryBuilder('accommodation');

    // Apply filter if 'type' is provided
    if (type) {
      query.andWhere('accommodation.type = :type', { type });
    }

    return await query.getMany();
  }

  // Lấy thông tin chi tiết của Accommodation cùng với các tiện ích và khuyến mãi
  async getAccommodationById(id: number): Promise<AccommodationDTO> {
    const accommodation = await this.accommodationRepository.findOne({
      where: { accommodation_id: id },
      relations: [
        'amenities', // Quan hệ với bảng amenities
        'promotions', // Quan hệ với bảng trung gian
        'promotions.promotion', // Đảm bảo lấy đầy đủ thông tin khuyến mãi
      ],
    });

    if (!accommodation) {
      throw new NotFoundException(`Accommodation with ID ${id} not found`);
    }

    return this.mapToDTO(accommodation);
  }

  private mapToDTO(accommodation: Accommodation): AccommodationDTO {
    const amenities =
      accommodation.amenities?.map((amenity) => ({
        amenity_id: amenity?.amenity_id || null,
        name: amenity?.name || 'Unknown',
        image_url: amenity?.image_url || 'Unknown',
      })) || [];

    const promotions =
      accommodation.promotions?.map((promotion) => ({
        promotion_id: promotion.promotion?.promotion_id || null,
        name: promotion.promotion?.name || 'Unknown',
        discount_percentage: promotion.promotion?.discount_percentage || 0,
        start_date: promotion.promotion?.start_date || null,
        end_date: promotion.promotion?.end_date || null,
      })) || [];

    return {
      accommodation_id: accommodation.accommodation_id,
      name: accommodation.name,
      type: accommodation.type,
      price_per_night: accommodation.price_per_night,
      rating: accommodation.rating,
      max_guests: accommodation.max_guests,
      description: accommodation.description,
      address: accommodation.address,
      image_url: accommodation.image_url,
      amenities,
      promotions,
    };
  }
}
