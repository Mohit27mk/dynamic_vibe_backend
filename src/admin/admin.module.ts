import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt,strategies';
import { DatabaseModule } from 'src/database/database.module';

@Module({ 
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mohit', // Use environment variables for security
    })  ],
  controllers: [AdminController],
  providers: [AdminService,JwtStrategy],
  exports: [JwtModule],
})
export class AdminModule {}
