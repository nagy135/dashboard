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
      items: [
        {
          name: 'test',
          url: 'https://www.google.com',
          positions: [
            [2, 2],
            [2, 3],
            [2, 1],

            [4, 2],
            [4, 3],
            [4, 1],
          ],
          color: 'red',
        },
      ],
    });
  }
}
