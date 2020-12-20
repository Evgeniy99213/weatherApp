import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { parserStart } from './parser.service'



async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
  await parserStart()
}
bootstrap();
