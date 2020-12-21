import { Injectable } from '@nestjs/common'
import { City } from 'src/cities/cities.entity'
import { QueryRecord } from './queries.entity'
import { getRepository } from 'typeorm'
import { IMostQueried } from './interfaces/most-queried.interface'

@Injectable()
export class QueriesService {
  public async addQuery(city: string): Promise<QueryRecord> {
    const targerCity: City = await City.findOne({ where: { name: city } })
    const newQuery: QueryRecord = new QueryRecord(targerCity)
    return await newQuery.save()
  }

  public async findMostQueriedCity(): Promise<IMostQueried> {
    const record: any = await getRepository(QueryRecord)
      .createQueryBuilder('query')
      .leftJoinAndSelect('query.city', 'city')
      .select('name')
      .addSelect('COUNT(date)', 'sumQueries')
      .addSelect('region')
      .groupBy('name')
      .addGroupBy('region')
      .orderBy('COUNT(date)', 'DESC')
      .limit(1)
      .getRawOne()
    return record
  }
}
