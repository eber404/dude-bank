import { HttpRequest } from 'common/presentation/http/http-request.ts';
import {
  BadRequest,
  Created,
  HttpResponse,
  InternalServerError,
} from 'common/presentation/http/http-response.ts';
import { Notification } from 'common/domain/singletons/notification.ts';
import { Controller } from 'common/presentation/controllers/controller.ts';

import { CreateUser } from 'user/domain/usecases/create-user.ts';

export class CreateUserController implements Controller {
  constructor(private readonly createUserUseCase: CreateUser) {}

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
