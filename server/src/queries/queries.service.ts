import { Injectable } from '@nestjs/common'
import { City } from 'src/cities/cities.entity'
import { QueryRecord } from './queries.entity'

@Injectable()
export class QueriesService {

    public async addQuery(city: string): Promise<QueryRecord> {
        const targerCity: City = await City.findOne({ where: { name: city } })
        const newQuery: QueryRecord = new QueryRecord(targerCity)
        return await newQuery.save()
    }
}
