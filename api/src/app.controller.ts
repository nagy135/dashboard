import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { DashboardsService } from './dashboards/dashboards.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
    private readonly dashboardService: DashboardsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  getUsers() {
    return this.userService.getAll();
  }

  @Post('users')
  createUser() {
    return this.userService.create();
  }

  @Get('dashboard')
  getDashboards() {
    return this.dashboardService.getAll();
  }

  @Post('dashboard')
  createDashboard() {
    return this.dashboardService.create();
  }

  @Post('dashboard/:id/item/:itemId/positions')
  updatePositions(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Body() body: any,
  ) {
    return this.dashboardService.updatePositions(id, itemId, body.positions);
  }
}
