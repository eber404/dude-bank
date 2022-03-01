import { TransferUseCase } from 'application/usecases/transfer-usecase.ts';

import { TransferController } from 'presentation/controllers/transfer-controller.ts';

import { CreateTransactionRepositoryLocal } from 'infra/repositories/create-transaction-repository-local.ts';
import { GetAccountRepositoryLocal } from 'infra/repositories/get-account-repository-local.ts';
import { UpdateAccountRepositoryLocal } from 'infra/repositories/update-account-repository-local.ts';

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
