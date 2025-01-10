import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
    { bufferLogs: true, bodyParser: true, rawBody: true },
  );

  app.enableCors({
    origin: true, // Allow all origins
  });
  
  const logger = new Logger();

  const configService = app.get(ConfigService);
  const PORT = configService.get('port');
  await app.listen(PORT);
  logger.log(
    `Application is running on ${configService.get(
      'NODE_ENV',
    )} server: ${await app.getUrl()}`,
  );
}
bootstrap();
