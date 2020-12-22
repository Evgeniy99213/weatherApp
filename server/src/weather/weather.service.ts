import { Injectable } from '@nestjs/common'
import { City } from '../cities/cities.entity'
import { getRepository } from 'typeorm'
import { Weather } from './weather.entity'
import { Logger } from '@nestjs/common'

@Injectable()
export class WeatherService {
  private logger: Logger = new Logger('WeatherService')

  public async findRecord(city: string, date: string): Promise<Weather> {
    try {
      const targetCity: City = await City.findOne({ where: { name: city } })
      const record: any = await Weather.findOne({
        relations: ['city'],
        where: { date: date, city: targetCity },
      })
      return record
    } catch (err) {
      this.logger.error(`ERROR in "findRecord" function!`)
      console.trace(err)
    }
  }

  public async findAvgtemp(city: string): Promise<any> {
    try {
      const targetCity: City = await City.findOne({ where: { name: city } })
      const record: any = await getRepository(Weather)
        .createQueryBuilder('weather')
        .leftJoinAndSelect('weather.city', 'city')
        .where('city.name = :city', { city: targetCity.name })
        .select('name')
        .addSelect('AVG(avgtemp_c)', 'average_C')
        .addSelect('AVG(avgtemp_f)', 'average_F')
        .groupBy('name')
        .getRawOne()

      return record
    } catch (err) {
      this.logger.error(`ERROR in "findAvgtemp" function!`)
      console.trace(err)
    }
  }
}
