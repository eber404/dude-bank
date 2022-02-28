import { CreateUserUseCase } from 'application/usecases/create-user-usecase.ts';

import { HttpRequest } from 'presentation/http/http-request.ts';
import {
  BadRequest,
  Created,
  HttpResponse,
  InternalServerError,
} from 'presentation/http/http-response.ts';
import { Notification } from 'domain/singletons/notification.ts';
import { Controller } from 'presentation/controllers/controller.ts';

export class CreateUserController implements Controller {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = request;

      if (!body.name || !body.password || !body.email) {
        return BadRequest('inform name, email and password');
      }

      await this.createUserUseCase.execute(body);

      if (Notification.hasErrors()) {
        const errorMessages = Notification.getErrorMessages();

        return BadRequest(errorMessages);
      }

      return Created();
    } catch (error) {
      return InternalServerError(error.message);
    } finally {
      Notification.clearNotifications();
    }
  }
}
