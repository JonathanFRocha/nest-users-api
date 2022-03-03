import { HttpStatus } from '@nestjs/common';
import { User } from 'src/users/models/user.entity';
import { NestResponse } from './nest-response';

export class NestResponseBuilder {
  private response: NestResponse = {
    status: 200,
    headers: {},
    body: {},
  };

  public withStatus(status: HttpStatus): NestResponseBuilder {
    this.response.status = status;
    return this;
  }

  public withHeaders(headers: Object): NestResponseBuilder {
    this.response.headers = headers;
    return this;
  }

  withBody(body: User): NestResponseBuilder {
    this.response.body = body;
    return this;
  }

  build(): NestResponse {
    return new NestResponse(this.response);
  }
}
