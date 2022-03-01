import { assertEquals } from 'std/testing/asserts.ts';

import { Account } from 'domain/entities/account.ts';
import {
  GetAccountRepository,
  UpdateAccountRepository,
} from 'domain/repositories/account-repository.ts';
import { CreateTransactionRepository } from 'domain/repositories/transaction-repository.ts';

import { TransferUseCase } from 'application/usecases/transfer-usecase.ts';
import { User } from '../../../src/domain/entities/user.ts';

const senderMock = new User({
  email: 'fulano@email.com',
  name: 'fulano',
  password: '12345678',
});

const receiverMock = new User({
  email: 'ciclano@email.com',
  name: 'ciclano',
  password: '12345678',
});

const accounts = [senderMock.account, receiverMock.account];

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
  new TransferUseCase({
    createTransactionRepository,
    getAccountRepository,
    updateAccountRepository,
  });

Deno.test('make transaction use case', async (t) => {
  // given
  const transferUseCase = makeSut();

  // when
  if (!senderMock.account.id || !receiverMock.account.id) {
    throw new Error(
      `Account id ${
        senderMock.account.id ?? receiverMock.account.id
      } not found`,
    );
  }

  await transferUseCase.execute({
    amount: 100,
    description: '',
    from: senderMock.account.id,
    to: receiverMock.account.id,
  });

  await t.step(
    'should withdraw 100 from sender account',
    () => {
      // then
      assertEquals(senderMock.account.balance, 900);
    },
  );

  await t.step('should deposit 100 to receiver account', () => {
    // then
    assertEquals(receiverMock.account.balance, 1100);
  });

  await t.step(
    'should add transaction to receiver and to sender accounts',
    () => {
      // then
      assertEquals(senderMock.account.transactions.length, 1);
      assertEquals(receiverMock.account.transactions.length, 1);
    },
  );
});
