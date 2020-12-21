import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common'
import { Inject } from '@nestjs/common'
import { Response } from 'express'
import { QueriesService } from 'src/queries/queries.service'
import { IAverageTemp } from './interfaces/average-temp.interface'
import { Weather } from './weather.entity'
import { WeatherService } from './weather.service'

@Controller('weather')
export class WeatherController {
  @Inject()
  private WeatherService: WeatherService

  @Inject()
  private QueriesService: QueriesService

  @Get('avgtemp/:city')
  async getAvgtempByCity(@Res() res: Response, @Param('city') city: string) {
    await this.QueriesService.addQuery(city)
    const avgtemp: Partial<IAverageTemp> = await this.WeatherService.findAvgtemp(
      city,
    )
    if (!avgtemp) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: `The average temperature for the city '${city}' was not found!`,
      })
    }
    return res.status(HttpStatus.OK).json(avgtemp)
  }

  @Get(':city/:date')
  async getWeatherByDate(
    @Res() res: Response,
    @Param('city') city: string,
    @Param('date') date: string,
  ) {
    await this.QueriesService.addQuery(city)
    const record: Partial<Weather> = await this.WeatherService.findRecord(
      city,
      date,
    )
    if (!record) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: `The weather for the city: '${city}' for the date: ${date} was not found!`,
        text: `Remember you can query weather for the capitals of US states for the last 7 days since the day when data was parsed: ${date}.`,
      })
    }
    return res.status(HttpStatus.OK).json(record)
  }
}
