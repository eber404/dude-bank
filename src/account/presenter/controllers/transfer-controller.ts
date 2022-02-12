import { Controller } from 'common/presentation/controllers/controller.ts';

export class TransferController implements Controller {
  constructor(private readonly transferUseCase) {}
}
