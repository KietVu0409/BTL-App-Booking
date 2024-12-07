import { Controller, Get, Query, Param } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { FilterAccommodationsDto } from './dto/filter-accommodations.dto';
import { FilterAccommodationByTypeDto } from './dto/filter-accommodation-by-type.dto';
import { Accommodation } from './accommodation.entity';
import { AccommodationDTO } from './dto/accommodation.dto';

@Controller('accommodations')
export class AccommodationController {
  constructor(private readonly accommodationService: AccommodationService) {}

  // Route lọc accommodation theo location_type.type
  @Get('filterByLocationType')
  async getFilteredAccommodations(
    @Query() filterAccommodationsDto: FilterAccommodationsDto,
  ): Promise<Accommodation[]> {
    // Gọi service để lọc accommodation theo location type
    return this.accommodationService.getAccommodationsByLocationType(
      filterAccommodationsDto,
    );
  }

  @Get('filterByType')
  async filterAccommodations(
    @Query() filterAccommodationByTypeDto: FilterAccommodationByTypeDto,
  ): Promise<Accommodation[]> {
    return this.accommodationService.filterAccommodations(
      filterAccommodationByTypeDto,
    );
  }

  // Route lấy thông tin chi tiết accommodation theo ID
  @Get(':id')
  async getAccommodationById(
    @Param('id') id: number,
  ): Promise<AccommodationDTO> {
    return this.accommodationService.getAccommodationById(id);
  }
}
