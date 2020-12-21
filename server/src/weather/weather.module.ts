import { Module } from '@nestjs/common'
import { QueriesModule } from 'src/queries/queries.module'
import { QueriesService } from 'src/queries/queries.service'
import { WeatherController } from './weather.controller'
import { WeatherService } from './weather.service'

@Module({
  controllers: [WeatherController],
  providers: [WeatherService, QueriesService],
  imports: [QueriesModule],
})
export class WeatherModule {}
