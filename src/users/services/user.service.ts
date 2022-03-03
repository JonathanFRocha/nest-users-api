import { Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      username: 'Jonathan',
      email: 'jonathan@gmail.com',
      password: '1234',
      fullName: 'Jonathan Ferreira',
      entryDate: new Date(),
    },
  ];

  public create(user: User): User {
    this.users.push(user);
    return user;
  }

  public findByName(userName: string): User {
    return this.users.find((user) => user.username == userName);
  }
}
