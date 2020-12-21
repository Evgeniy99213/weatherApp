import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CitiesModule } from './cities/cities.module'
import { WeatherModule } from './weather/weather.module'
import { QueriesModule } from './queries/queries.module'
import { ParserModule } from './parser/parser.module'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(),
    CitiesModule,
    WeatherModule,
    QueriesModule,
    ParserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
