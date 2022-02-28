import { HttpRequest } from 'presentation/http/http-request.ts';
import { HttpResponse } from 'presentation/http/http-response.ts';

export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>;
}
