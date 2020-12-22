import { Module } from '@nestjs/common'
import { QueriesModule } from '../queries/queries.module'
import { QueriesService } from '../queries/queries.service'
import { WeatherController } from './weather.controller'
import { WeatherService } from './weather.service'

@Module({
  controllers: [WeatherController],
  providers: [WeatherService, QueriesService],
  imports: [QueriesModule],
})
export class WeatherModule {}
