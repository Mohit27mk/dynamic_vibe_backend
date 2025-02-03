import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import cors from '@fastify/cors';



async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
    { bufferLogs: true, bodyParser: true, rawBody: true },
  );

  const fastify = app.getHttpAdapter().getInstance();  // Get Fastify instance

  await app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Manually handle OPTIONS requests
  fastify.addHook('preHandler', async (req, reply) => {
    if (req.method === 'OPTIONS') {
      reply
        .header('Access-Control-Allow-Origin', '*')
        .header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
        .header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        .code(204)  // No content response for OPTIONS
        .send();
    }
  });


  
  const logger = new Logger();

  const configService = app.get(ConfigService);
  const PORT = configService.get('port');
  await app.listen(PORT,'0.0.0.0');
  logger.log(
    `Application is running on ${configService.get(
      'NODE_ENV',
    )} server: ${await app.getUrl()}`,
  );
}
bootstrap();
