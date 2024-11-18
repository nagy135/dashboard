import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateDashboardDto } from 'src/dtos/create-dashboard-dto';
import { Dashboard } from 'src/schemas/dashboard.schema';

@Injectable()
export class DashboardsService {
  constructor(
    @InjectModel(Dashboard.name) private dashboardModel: Model<Dashboard>,
  ) {}

  async getAll(userId: string) {
    return await this.dashboardModel
      .find({ userId })
      .populate('userId', 'username');
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

  async create(userId: string, createDashboardDto: CreateDashboardDto) {
    return this.dashboardModel.create({
      userId,
      items: createDashboardDto.items.map((e) => ({
        _id: new mongoose.mongo.ObjectId(),
        name: e.name,
        url: e.url,
        color: e.color,
        positions: e.positions,
      })),
    });
  }
}
