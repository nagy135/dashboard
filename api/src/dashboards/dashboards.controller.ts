import {
  Body,
  Controller,
  Request,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Dashboard } from 'src/schemas/dashboard.schema';
import { RequestWithUser } from 'src/types';
import { CreateDashboardDto } from 'src/dtos/create-dashboard-dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardsService) {}

  @Get()
  @UseGuards(AuthGuard)
  getDashboards(@Request() req: RequestWithUser) {
    return this.dashboardService.getAll(req.user.sub);
  }

  @Post()
  @UseGuards(AuthGuard)
  createDashboard(
    @Request() req: RequestWithUser,
    @Body() createDashboardDto: CreateDashboardDto,
  ) {
    return this.dashboardService.create(req.user.sub, createDashboardDto);
  }

  @Post('/:id/item')
  @UseGuards(AuthGuard)
  createItem(
    @Param('id') id: string,
    @Body() body: Dashboard['items'][number],
  ) {
    return this.dashboardService.createItem(id, body);
  }

  @Delete('/:id/item/:itemId')
  @UseGuards(AuthGuard)
  deleteItem(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.dashboardService.deleteItem(id, itemId);
  }

  @Put('/:id/item/:itemId/positions')
  @UseGuards(AuthGuard)
  updatePositions(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @Body() body: { positions: Dashboard['items'][number]['positions'] },
  ) {
    return this.dashboardService.updatePositions(id, itemId, body.positions);
  }
}
