import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Dashboard } from 'src/schemas/dashboard.schema';

@Injectable()
export class DashboardsService {
  constructor(
    @InjectModel(Dashboard.name) private dashboardModel: Model<Dashboard>,
  ) {}

  getAll() {
    return this.dashboardModel.find().exec();
  }

  async updatePositions(
    id: string,
    itemId: string,
    positions: [number, number][],
  ) {
    return await this.dashboardModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          items: {
            $elemMatch: {
              _id: itemId,
              positions,
            },
          },
        },
      },
    );
  }

  async create() {
    var newId = new mongoose.mongo.ObjectId();
    return this.dashboardModel.create({
      items: [
        {
          _id: newId,
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
