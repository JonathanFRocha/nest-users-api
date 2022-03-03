import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { UserService } from 'src/users/services/user.service';
import { User } from '../models/user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public create(@Body() user: User): NestResponse {
    const createdUser = this.userService.create(user);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/users/${createdUser.username}` })
      .withBody(createdUser)
      .build();
  }

  @Get(':userName')
  public findByUserName(@Param('userName') userName: string): NestResponse {
    const foundUser = this.userService.findByName(userName);
    if (!foundUser) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `User ${userName} not found`,
      });
    }
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withBody(foundUser)
      .build();
  }
}
