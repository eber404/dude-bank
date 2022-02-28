import {
  CreateTransactionRepository,
  GetAccountRepository,
  UpdateAccountRepository,
} from 'domain/repositories/account-repository.ts';
import {
  Notification,
  NotificationType,
} from 'domain/singletons/notification.ts';
import { Transaction } from 'domain/entities/transaction.ts';
import { MakeTransactionDTO } from 'application/dtos/make-transaction-dto.ts';
import { TransactionType } from '../../domain/entities/enums/transaction-type.ts';

export class TransferUseCase {
  constructor(
    private readonly createTransactionRepository: CreateTransactionRepository,
    private readonly getAccountRepository: GetAccountRepository,
    private readonly updateAccountRepository: UpdateAccountRepository,
  ) {}

  async execute(input: MakeTransactionDTO) {
    const senderAccount = await this.getAccountRepository.getById(
      input.fromAccountId,
    );

    const receiverAccount = await this.getAccountRepository.getById(
      input.toAccountId,
    );

    if (!senderAccount?.isValid() || !receiverAccount?.isValid()) {
      return Notification.add({
        message: `Account id ${
          receiverAccount?.id ?? senderAccount?.id
        } not found`,
        type: NotificationType.ERROR,
      });
    }

    const senderTransaction = new Transaction({
      amount: input.amount,
      description: input.description,
      from: senderAccount,
      to: receiverAccount,
      date: new Date(),
      type: TransactionType.DEBIT,
    });

    const receiverTransaction = new Transaction({
      amount: input.amount,
      description: input.description,
      from: senderAccount,
      to: receiverAccount,
      date: new Date(),
      type: TransactionType.CREDIT,
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
