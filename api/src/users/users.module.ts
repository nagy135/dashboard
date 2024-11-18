import { Module, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UsersController } from './users.controller';
import { UserMigrationService } from 'src/db/migrations/user';

@Module({
  providers: [UsersService, UserMigrationService],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
})
export class UsersModule implements OnModuleInit {
  constructor(private readonly userMigrationService: UserMigrationService) {}
  onModuleInit() {
    this.userMigrationService.runMigrations();
  }
}
