import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { IsUniqueUsernameConstraint } from './validator/is-unique-usermame';

@Module({
  controllers: [UserController],
  providers: [UserService, IsUniqueUsernameConstraint],
})
export class UserModule {}
