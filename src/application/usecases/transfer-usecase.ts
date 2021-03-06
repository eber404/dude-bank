import {
  GetAccountRepository,
  UpdateAccountRepository,
} from 'domain/repositories/account-repository.ts';
import { CreateTransactionRepository } from 'domain/repositories/transaction-repository.ts';
import {
  Notification,
  NotificationType,
} from 'domain/singletons/notification.ts';
import { Transaction } from 'domain/entities/transaction.ts';

import { MakeTransactionDTO } from 'application/dtos/make-transaction-dto.ts';

interface Dependencies {
  createTransactionRepository: CreateTransactionRepository;
  getAccountRepository: GetAccountRepository;
  updateAccountRepository: UpdateAccountRepository;
}

export class TransferUseCase {
  private readonly createTransactionRepository: CreateTransactionRepository;
  private readonly getAccountRepository: GetAccountRepository;
  private readonly updateAccountRepository: UpdateAccountRepository;

  constructor(
    dependencies: Dependencies,
  ) {
    this.createTransactionRepository = dependencies.createTransactionRepository;
    this.getAccountRepository = dependencies.getAccountRepository;
    this.updateAccountRepository = dependencies.updateAccountRepository;
  }

  async execute(input: MakeTransactionDTO) {
    const senderAccount = await this.getAccountRepository.getById(
      input.from,
    );

    const receiverAccount = await this.getAccountRepository.getById(
      input.to,
    );

    if (!senderAccount?.isValid() || !receiverAccount?.isValid()) {
      return Notification.add({
        message: `Account id ${input.from ?? input.to} not found`,
        type: NotificationType.ERROR,
      });
    }

    const senderTransaction = new Transaction({
      amount: input.amount,
      description: input.description,
      from: senderAccount.id,
      to: receiverAccount.id,
      date: new Date(),
    });

    const receiverTransaction = new Transaction({
      amount: input.amount,
      description: input.description,
      from: senderAccount.id,
      to: receiverAccount.id,
      date: new Date(),
    });

    if (!senderTransaction.isValid() || !receiverTransaction.isValid()) {
      return Notification.add({
        message: `Transaction is not valid`,
        type: NotificationType.ERROR,
      });
    }

    senderAccount.withdraw(input.amount);
    senderAccount.addTransaction(senderTransaction);

    receiverAccount.deposit(input.amount);
    receiverAccount.addTransaction(receiverTransaction);

    const repositoryTasks = [
      this.createTransactionRepository.create(senderTransaction),
      this.updateAccountRepository.update(senderAccount.id, senderAccount),
      this.updateAccountRepository.update(receiverAccount.id, receiverAccount),
    ];

    const results = await Promise.allSettled(repositoryTasks);

    results.forEach((result) => {
      if (result.status === 'rejected') {
        Notification.add({
          message: `Fail to process transaction`,
          type: NotificationType.ERROR,
        });
      }
    });
  }
}
