import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ParserService } from './parser/parser.service'

async function bootstrap() {
  const logger: Logger = new Logger('main.ts')
  const app = await NestFactory.create(AppModule)
  await app.get(ParserService).parserStart()

  await app.listen(process.env.SERVER_PORT, () =>
    logger.log(`Server started on port ${process.env.SERVER_PORT}`),
  )
}

bootstrap()
