import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { isUniqueUsername } from '../validator/is-unique-usermame';

export class User {
  id: number;

  @isUniqueUsername({
    message: 'userName must be another one',
  })
  @IsString({
    message: 'username must be string',
  })
  @IsNotEmpty({
    message: 'username is required',
  })
  username: string;

  @IsEmail({
    message: 'must be a email',
  })
  @IsNotEmpty({
    message: 'email is required',
  })
  email: string;

  @IsString({
    message: 'password must be a string',
  })
  @IsNotEmpty({
    message: 'password is required',
  })
  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @IsString({
    message: 'fullname must be a string',
  })
  @IsNotEmpty({
    message: 'fullname is required',
  })
  fullName: string;

  entryDate: Date;
}
