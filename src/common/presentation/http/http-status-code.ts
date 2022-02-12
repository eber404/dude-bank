export enum StatusCode {
  // success
  Ok = 200,
  Created = 201,

  // client errors
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  RequestTimeout = 408,

  // server errors
  InternalServerError = 500,
}
