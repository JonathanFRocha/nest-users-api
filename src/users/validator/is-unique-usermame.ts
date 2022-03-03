import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../services/user.service';

@Injectable()
@ValidatorConstraint()
export class IsUniqueUsernameConstraint
  implements ValidatorConstraintInterface
{
  constructor(private userService: UserService) {}

  validate(
    userName: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const user = this.userService.findByName(userName);
    if (!user) {
      return true;
    }

    return false;
  }
}

export function isUniqueUsername(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueUsernameConstraint,
    });
  };
}
