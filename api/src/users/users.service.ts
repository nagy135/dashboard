import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getAll() {
    return this.userModel.find().exec();
  }

  async create() {
    return this.userModel.create({
      name: 'test',
      password: 123,
    });
  }
}
