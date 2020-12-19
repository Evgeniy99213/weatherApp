import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from './cities/cities.module';
import { WeatherModule } from './weather/weather.module';
import { QueriesModule } from './queries/queries.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(),
    CitiesModule,
    WeatherModule,
    QueriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
