import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common'
import { Inject } from '@nestjs/common'
import { Response } from 'express'
import { QueriesService } from 'src/queries/queries.service'
import { Weather } from './weather.entity'
import { WeatherService } from './weather.service'


@Controller('weather')
export class WeatherController {

    @Inject()
    private WeatherService: WeatherService
    private QueriesService: QueriesService

    @Get('avgtemp/:city')
    async getAvgtempByCity(@Res() res: Response, @Param('city') city: string) {
        await this.QueriesService.addQuery(city)
        const avgtemp: any = await this.WeatherService.findAvgtemp(city)
        res.status(HttpStatus.OK).json(avgtemp)
    }

    @Get(':city/:date')
    async getWeatherByDate(@Res() res: Response, @Param('city') city: string, @Param('date') date: string) {
        await this.QueriesService.addQuery(city)
        const record: Weather = await this.WeatherService.findRecord(city, date)
        res.status(HttpStatus.OK).json(record)
    }

}
