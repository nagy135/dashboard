import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dashboard } from 'src/schemas/dashboard.schema';

@Injectable()
export class DashboardsService {
  constructor(
    @InjectModel(Dashboard.name) private dashboardModel: Model<Dashboard>,
  ) {}

  getAll() {
    return this.dashboardModel.find().exec();
  }

  async create() {
    return this.dashboardModel.create({
      positions: [
        [6, 0],
        [6, 1],
        [6, 2],
      ],
      color: 'red',
    });
  }
}
