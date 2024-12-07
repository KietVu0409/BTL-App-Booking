export class GetAllLocation {
  location_id: number;
  name: string;
  location_type: string;
  image_url: string;
  accommodations_count: number;
  promotions_count: number;

  constructor(location: any) {
    this.location_id = location.location_id;
    this.name = location.name;
    this.image_url = location.image_url;
    this.location_type = location.location_type.name;
    this.accommodations_count = location.accommodations?.length || 0;
    this.promotions_count = location.promotions?.length || 0;
  }
}
