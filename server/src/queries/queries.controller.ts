import { Controller, Res, HttpStatus, Get } from '@nestjs/common'
import { Inject } from '@nestjs/common'
import { Response } from 'express'
import { QueriesService } from './queries.service'

@Controller('queries')
export class QueriesController {
  @Inject()
  private QueriesService: QueriesService

  @Get('most-popular')
  async getMostPopular(@Res() res: Response) {
    const popularCity: any = await this.QueriesService.findMostQueriedCity()
    res.status(HttpStatus.OK).json(popularCity)
  }
}
