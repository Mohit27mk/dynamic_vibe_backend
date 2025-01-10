import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import appConfig from './config/app-config';
import dbConfig from './config/database-config';
import securityConfig from './config/security-config';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath: `${process.cwd()}/${process.env.NODE_ENV}.env`,
    isGlobal: true,
    load: [appConfig, dbConfig, securityConfig],
  }), ClientModule,DatabaseModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
