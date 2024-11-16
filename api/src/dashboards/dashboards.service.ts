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
    return this.dashboardModel.updateOne(
      {
        _id: new mongoose.mongo.ObjectId(id),
      },
      {
        $set: {
          'items.$[item].positions': positions,
        },
      },
      {
        arrayFilters: [
          {
            'item._id': new mongoose.mongo.ObjectId(itemId),
          },
        ],
      },
    );
  }

  async create() {
    return this.dashboardModel.create({
      items: [
        {
          _id: new mongoose.mongo.ObjectId(),
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
        {
          _id: new mongoose.mongo.ObjectId(),
          name: 'test2',
          url: 'https://www.youtube.com',
          positions: [
            [3, 2],
            [3, 3],
            [3, 1],

            [6, 6],
            [6, 7],
            [7, 6],
            [7, 7],
          ],
          color: 'blue',
        },
      ],
    });
  }
}
