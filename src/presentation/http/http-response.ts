import { StatusCode } from 'presentation/http/http-status-code.ts';

export interface HttpResponse {
  body: string;
  status: StatusCode;
}

export const BadRequest = (body = 'Bad request'): HttpResponse => ({
  body,
  status: StatusCode.BadRequest,
});

export const Unauthorized = (body = 'Unauthorized'): HttpResponse => ({
  body,
  status: StatusCode.Unauthorized,
});

export const NotFound = (body = 'Not found'): HttpResponse => ({
  body,
  status: StatusCode.NotFound,
});

export const RequestTimeout = (body = 'Request timeout'): HttpResponse => ({
  body,
  status: StatusCode.RequestTimeout,
});

export const InternalServerError = (
  body = 'Internavel server error',
): HttpResponse => ({
  body,
  status: StatusCode.InternalServerError,
});

export const Ok = (body = 'Ok'): HttpResponse => ({
  body,
  status: StatusCode.Ok,
});

export const Created = (body = 'Created'): HttpResponse => ({
  body,
  status: StatusCode.Created,
});
