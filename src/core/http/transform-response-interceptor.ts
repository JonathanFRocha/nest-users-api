import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestResponse } from './nest-response';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((responseController: NestResponse) => {
        if (responseController instanceof NestResponse) {
          const contextHttp = context.switchToHttp();
          const resp = contextHttp.getResponse();
          const { headers, status, body } = responseController;

          const headerNames = Object.getOwnPropertyNames(headers);
          headerNames.forEach((headerName) => {
            const headerValue = headers[headerName];
            this.httpAdapter.setHeader(resp, headerName, headerValue);
          });

          this.httpAdapter.status(resp, status);

          return body;
        }

        return responseController;
      }),
    );
  }
}
