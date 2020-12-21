import { Controller, Res, HttpStatus, Get } from '@nestjs/common'
import { Inject } from '@nestjs/common'
import { Response } from 'express'
import { IMostQueried } from './interfaces/most-queried.interface'
import { QueriesService } from './queries.service'

@Controller('queries')
export class QueriesController {
  @Inject()
  private QueriesService: QueriesService

  @Get('most-popular-city')
  async getMostPopular(@Res() res: Response) {
    const popularCity: Partial<IMostQueried> = await this.QueriesService.findMostQueriedCity()
    if (!popularCity) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: `The most queried city does not exist! There are none query records.`,
      })
    }
    return res.status(HttpStatus.OK).json(popularCity)
  }
}
