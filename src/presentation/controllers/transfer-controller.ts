import { Controller } from 'presentation/controllers/controller.ts';
import {
  BadRequest,
  HttpResponse,
  InternalServerError,
  Ok,
} from 'presentation/http/http-response.ts';
import { HttpRequest } from 'presentation/http/http-request.ts';
import { Notification } from 'domain/singletons/notification.ts';

import { TransferUseCase } from 'application/usecases/transfer-usecase.ts';

export class TransferController implements Controller {
  constructor(private readonly transferUseCase: TransferUseCase) {}

  async handle(input: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = input;
      if (!body.fromAccountId || !body.toAccountId || !body.amount) {
        return BadRequest('inform fromAccountId, toAccountId and amount');
      }

      await this.transferUseCase.execute(input.body);

      if (Notification.hasErrors()) {
        const errorMessages = Notification.getErrorMessages();

        return BadRequest(errorMessages);
      }

      return Ok('Transfer executed');
    } catch (error) {
      return InternalServerError(error.message);
    } finally {
      Notification.clearNotifications();
    }
  }
}
