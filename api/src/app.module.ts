import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardsModule } from './dashboards/dashboards.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    DashboardsModule,
    MongooseModule.forRoot('mongodb://mongo:mongo@mongo:27017'),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
