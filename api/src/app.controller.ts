import { Controller, Get, Post } from '@nestjs/common';
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
}
