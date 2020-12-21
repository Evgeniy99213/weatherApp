import { Injectable } from '@nestjs/common'
import { City } from './cities.entity'

@Injectable()
export class CitiesService {
  public getCities = async (): Promise<City[]> => await City.find()
}
