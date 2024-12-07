import { Controller, Get } from '@nestjs/common';
import { LocationService } from './location.service';
import { GetAllLocation } from './dto/getall-location.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('getall')
  async getLocations(): Promise<GetAllLocation[]> {
    return this.locationService.getAllLocations();
  }
}
