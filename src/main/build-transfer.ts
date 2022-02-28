import { TransferController } from 'presentation/controllers/transfer-controller.ts';

import { TransferUseCase } from 'application/usecases/transfer-usecase.ts';

function buildTransfer(): TransferController {
  const transferUseCase = new TransferUseCase({
    createTransactionRepository: new CreateTransactionRepositoryLocal(),
    getAccountRepository: new GetAccountRepositoryLocal(),
    updateAccountRepository: new UpdateAccountRepositoryLocal(),
  });

  const transferController = new TransferController(transferUseCase);

  return transferController;
}

const transferController = buildTransfer();

export { transferController };
