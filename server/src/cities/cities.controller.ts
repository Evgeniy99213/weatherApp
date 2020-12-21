import { Controller, Get, HttpStatus, Res } from '@nestjs/common'
import { Response } from 'express'
import { Inject } from '@nestjs/common'
import { CitiesService } from './cities.service'
import { City } from './cities.entity'

@Controller('cities')
export class CitiesController {
  @Inject()
  private CitiesService: CitiesService

  @Get()
  async handle(@Res() res: Response) {
    const cities: City[] = await this.CitiesService.getCities()
    if (!cities.length) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: `Cities are not found!`,
      })
    }
    return res.status(HttpStatus.OK).json(cities)
  }
}
