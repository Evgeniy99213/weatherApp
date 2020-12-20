import { Module } from '@nestjs/common';
import { QueriesModule } from 'src/queries/queries.module';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';


@Module({
  controllers: [WeatherController],
  providers: [WeatherService],
  imports: [QueriesModule]

})
export class WeatherModule {}
