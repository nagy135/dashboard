import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getAll() {
    return [{ id: 1 }];
  }
}
