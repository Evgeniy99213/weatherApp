import { Injectable, Logger } from '@nestjs/common'
import { City } from '../cities/cities.entity'
import { QueryRecord } from './queries.entity'
import { getRepository } from 'typeorm'
import { IMostQueried } from './interfaces/most-queried.interface'

@Injectable()
export class QueriesService {
  private logger: Logger = new Logger('QueriesService')
  public async addQuery(city: string): Promise<QueryRecord> {
    try {
      const targerCity: City = await City.findOne({ where: { name: city } })
      const newQuery: QueryRecord = new QueryRecord(targerCity)
      return await newQuery.save()
    } catch (err) {
      this.logger.error(`ERROR in "findRecord" function!`)
      console.trace(err)
    }
  }

  public async findMostQueriedCity(): Promise<IMostQueried> {
    try {
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
    } catch (err) {
      this.logger.error(`ERROR in "findRecord" function!`)
      console.trace(err)
    }
  }
}
