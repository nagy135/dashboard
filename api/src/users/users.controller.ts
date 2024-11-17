import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getDashboards() {
    return this.userService.getAll();
  }

  @Post()
  createDashboard() {
    return this.userService.create();
  }
}
