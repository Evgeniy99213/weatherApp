import { Injectable, Logger } from '@nestjs/common'
import { City } from './cities.entity'

@Injectable()
export class CitiesService {
  private logger: Logger = new Logger('CitiesService')

  public async getCities(): Promise<City[]> {
    try {
      return await City.find()
    } catch (err) {
      this.logger.error(`ERROR in "getCities" function!`)
      console.trace(err)
    }
  }
}
