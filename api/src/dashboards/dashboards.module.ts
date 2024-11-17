import { Module } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dashboard, DashboardSchema } from 'src/schemas/dashboard.schema';
import { DashboardController } from './dashboards.controller';

@Module({
  providers: [DashboardsService],
  controllers: [DashboardController],
  exports: [DashboardsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Dashboard.name,
        schema: DashboardSchema,
      },
    ]),
  ],
})
export class DashboardsModule {}
