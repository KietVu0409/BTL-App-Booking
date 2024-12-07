import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { GetAllLocation } from './dto/getall-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async getAllLocations(): Promise<GetAllLocation[]> {
    const locations = await this.locationRepository.find({
      relations: ['location_type', 'accommodations', 'promotions'],
    });

    return locations.map((location) => new GetAllLocation(location));
  }
}
