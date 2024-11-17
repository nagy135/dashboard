import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardsService) {}

  @Get()
  getDashboards() {
    return this.dashboardService.getAll();
  }

  @Post()
  createDashboard() {
    return this.dashboardService.create();
  }

  @Put('/:id/item/:itemId/positions')
  updatePositions(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Body() body: any,
  ) {
    return this.dashboardService.updatePositions(id, itemId, body.positions);
  }
}
