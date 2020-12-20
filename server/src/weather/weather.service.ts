import { Injectable } from '@nestjs/common';
import { City } from 'src/cities/cities.entity';
import { createQueryBuilder, getRepository } from 'typeorm';
import { Weather } from './weather.entity'

@Injectable()
export class WeatherService {
    public async findRecord(city: string, date: string): Promise<Weather> {
        const targetCity: City = await City.findOne({ where: {name: city} })
        const record: any = await Weather.findOne({
            relations: ['city'],
            where:  { date: date, city: targetCity }
        })
        return record
    }

    public async findAvgtemp(city: string): Promise<any> {
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
    }
}
