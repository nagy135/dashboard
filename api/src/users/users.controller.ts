import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUser } from 'src/types';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Request() req: RequestWithUser) {
    console.log('================\n', 'req: ', req.user, '\n================');
    return this.userService.create();
  }
}
