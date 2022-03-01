import { assertEquals } from 'std/testing/asserts.ts';

import { GetAccountRepositoryLocal } from 'infra/repositories/get-account-repository-local.ts';
import { CreateAccountRepositoryLocal } from 'infra/repositories/create-account-repository-local.ts';

import { User } from 'domain/entities/user.ts';

Deno.test('get account repository local', async (t) => {
  // given
  localStorage.clear();

  const createAccountRepository = new CreateAccountRepositoryLocal();
  const getAccountRepository = new GetAccountRepositoryLocal();

  const userMock = new User({
    email: 'john@email.com',
    password: '12345678',
    name: 'John',
  });

  // when
  await createAccountRepository.create(userMock.account);
  const account = await getAccountRepository.getById(userMock.account.id);

  // then
  assertEquals(userMock.account.id, account?.id);
});
