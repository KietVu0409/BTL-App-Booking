import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationType } from './location-type.entity';

@Injectable()
export class LocationTypeService {
  constructor(
    @InjectRepository(LocationType)
    private readonly locationTypeRepository: Repository<LocationType>,
  ) {}

  /**
   * Lấy tất cả Location Types
   * @returns Promise<LocationType[]>
   */
  async getAllLocationTypes(): Promise<LocationType[]> {
    return this.locationTypeRepository.find();
  }
}
