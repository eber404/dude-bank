import { assertEquals } from 'std/testing/asserts.ts';

import {
  CreateTransactionRepository,
  GetAccountRepository,
  UpdateAccountRepository,
} from 'account/domain/repositories/account-repository.ts';
import { TransferUseCase } from 'account/application/usecases/transfer-usecase.ts';
import { Account } from 'account/domain/entities/account.ts';
import { User } from 'user/domain/entities/user.ts';

const userMock = new User({
  email: 'fulano@gmail.com',
  name: 'Fulano',
  password: '12345678',
});

const senderAccountMock = new Account({
  balance: 1000,
  user: userMock,
  id: crypto.randomUUID(),
  transactions: [],
});

const receiverAccountMock = new Account({
  balance: 1000,
  user: userMock,
  id: crypto.randomUUID(),
  transactions: [],
});

const accounts = [senderAccountMock, receiverAccountMock];

const createTransactionRepository: CreateTransactionRepository = {
  create: async () => void 0,
};
const getAccountRepository: GetAccountRepository = {
  getById: async (id: string) =>
    Promise.resolve(accounts.find((account) => account.id === id) ?? null),
};
const updateAccountRepository: UpdateAccountRepository = {
  update: async () => void 0,
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
    async () => {
      // then
      assertEquals(senderAccountMock.balance, 900);
    },
  );

  await t.step('should deposit 100 to receiver account', async () => {
    // then
    assertEquals(receiverAccountMock.balance, 1100);
  });

  await t.step(
    'should add transaction to receiver and to sender accounts',
    async () => {
      // then
      assertEquals(senderAccountMock.transactions.length, 1);
      assertEquals(receiverAccountMock.transactions.length, 1);
    },
  );
});
