import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express'
import { Inject } from '@nestjs/common';
import { CitiesService } from './cities.service'
import { City } from './cities.entity'

@Controller('cities')
export class CitiesController {
    @Inject()
    private CitiesService: CitiesService

    @Get()
    async handle(@Res() res: Response) {
        const cities: City[] = await this.CitiesService.getCities()
        res.status(HttpStatus.OK).json(cities) 
    }
}
