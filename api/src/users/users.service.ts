import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAll() {
    return await this.userModel.find();
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }

  async create() {
    return this.userModel.create({
      username: 'test',
      password: '123',
    });
  }
}
