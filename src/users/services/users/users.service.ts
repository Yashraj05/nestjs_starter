import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  fetchUsers() {
    return { a: '123', b: '45' };
  }
}
