import { Controller, Get } from '@nestjs/common';
import { LocationTypeService } from './location-type.service';
import { LocationTypeDto } from './dto/location-type.dto';

@Controller('location-types')
export class LocationTypeController {
  constructor(private readonly locationTypeService: LocationTypeService) {}

  /**
   * API để lấy tất cả các loại địa điểm
   * @returns LocationTypeDto[]
   */
  @Get('getall')
  async getAllLocationTypes(): Promise<LocationTypeDto[]> {
    const locationTypes = await this.locationTypeService.getAllLocationTypes();
    return locationTypes.map((type) => ({
      location_type_id: type.location_type_id,
      type: type.type,
      image_url: type.image_url,
    }));
  }
}
