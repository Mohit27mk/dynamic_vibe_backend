import { Global, Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { Pool } from 'pg';
import { DatabaseService } from './database.service';

const databasePoolFactory = async (configService: ConfigService) => {
  return new Pool({
    user: configService.get<string>('user')?configService.get<string>('user'):'postgres',
    host: configService.get<string>('host')?configService.get<string>('host'):'147.93.47.24',
    database: configService.get<string>('database')?configService.get<string>('database'):'dynamic_vibe',
    password: configService.get<string>('password')?configService.get<string>('password'):'newpassword',
    port: configService.get<number>('db_port')?configService.get<number>('db_port'):5432,
  });
};

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: databasePoolFactory,
    },
    DatabaseService,
    // GatewayHandlerGateway,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule implements OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(private readonly moduleRef: ModuleRef) {}

  onApplicationShutdown(signal?: string): any {
    this.logger.log(`Shutting down on signal ${signal}`);
    const pool = this.moduleRef.get('DATABASE_POOL') as Pool;
    return pool.end();
  }
}
