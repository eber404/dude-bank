import { Handler, RequestEvent } from 'nhttp/mod.ts';

import { Controller } from 'domain/controllers/controller.ts';

import { HttpRequest } from 'presentation/http/http-request.ts';
import { Output } from 'presentation/adapters/json-data-output.ts';

export class NHttpAdapter {
  public static Post(
    controller: Controller,
  ): Handler<RequestEvent> | Handler<RequestEvent>[] {
    return async function (rev: RequestEvent) {
      const request: HttpRequest = {
        body: rev.body,
        headers: rev.headers,
        method: rev.method,
        params: JSON.stringify(rev.params),
        query: rev.query,
      };

      const httpResponse = await controller.handle(request);

      const output = new Output(httpResponse.body);

      rev.response.status(httpResponse.status).json(output);
    };
  }
}
