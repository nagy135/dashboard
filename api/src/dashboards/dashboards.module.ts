import { Module } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dashboard, DashboardSchema } from 'src/schemas/dashboard.schema';

@Module({
  providers: [DashboardsService],
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
