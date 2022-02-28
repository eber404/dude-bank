import { assertEquals } from 'std/testing/asserts.ts';

import { Account } from 'domain/entities/account.ts';
import {
  GetAccountRepository,
  UpdateAccountRepository,
} from 'domain/repositories/account-repository.ts';
import { CreateTransactionRepository } from 'domain/repositories/transaction-repository.ts';

import { TransferUseCase } from 'application/usecases/transfer-usecase.ts';

const senderAccountMock = new Account({
  balance: 1000,
  id: crypto.randomUUID(),
  transactions: [],
});

const receiverAccountMock = new Account({
  balance: 1000,
  id: crypto.randomUUID(),
  transactions: [],
});

const accounts = [senderAccountMock, receiverAccountMock];

const createTransactionRepository: CreateTransactionRepository = {
  create: async () => await void 0,
};
const getAccountRepository: GetAccountRepository = {
  getById: async (id: string) =>
    await Promise.resolve(
      accounts.find((account) => account.id === id) ?? null,
    ),
};
const updateAccountRepository: UpdateAccountRepository = {
  update: async () => await void 0,
};

const makeSut = () =>
  new TransferUseCase(
    createTransactionRepository,
    getAccountRepository,
    updateAccountRepository,
  );

Deno.test('make transaction use case', async (t) => {
  // given
  const transferUseCase = makeSut();

  // when
  if (!senderAccountMock.id || !receiverAccountMock.id) {
    throw new Error(
      `Account id ${senderAccountMock.id ?? receiverAccountMock.id} not found`,
    );
  }

  await transferUseCase.execute({
    amount: 100,
    description: '',
    fromAccountId: senderAccountMock.id,
    toAccountId: receiverAccountMock.id,
  });

  await t.step(
    'should withdraw 100 from sender account',
    () => {
      // then
      assertEquals(senderAccountMock.balance, 900);
    },
  );

  await t.step('should deposit 100 to receiver account', () => {
    // then
    assertEquals(receiverAccountMock.balance, 1100);
  });

  await t.step(
    'should add transaction to receiver and to sender accounts',
    () => {
      // then
      assertEquals(senderAccountMock.transactions.length, 1);
      assertEquals(receiverAccountMock.transactions.length, 1);
    },
  );
});
