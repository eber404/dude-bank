import { Controller } from 'domain/controllers/controller.ts';
import { Notification } from 'domain/singletons/notification.ts';

import { TransferUseCase } from 'application/usecases/transfer-usecase.ts';

import {
  BadRequest,
  HttpResponse,
  InternalServerError,
  Ok,
} from 'presentation/http/http-response.ts';
import { HttpRequest } from 'presentation/http/http-request.ts';

export class TransferController implements Controller {
  constructor(private readonly transferUseCase: TransferUseCase) {}

  async handle(input: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = input;
      if (!body.from || !body.to || !body.amount) {
        return BadRequest(
          'inform from (account id), to (account id) and amount',
        );
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
