import { HttpRequest } from 'common/presentation/http/http-request.ts';
import { HttpResponse } from 'common/presentation/http/http-response.ts';

export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>;
}
