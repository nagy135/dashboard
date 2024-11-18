import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserMigrationService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async runMigrations() {
    try {
      await this.migration0();
    } catch {}
  }

  async migration0() {
    try {
      const user = await this.userModel.findOne({ username: 'admin' });
      if (user) {
        console.log('[INFO] seed: user already exists');
        return;
      }
      const userModelCreated = await this.userModel.create({
        username: 'admin',
        password: 'admin',
        migrationsRan: 0,
      });
      console.log('[INFO] seed:', userModelCreated);
    } catch (e) {
      console.log(e);
    }
  }
}
