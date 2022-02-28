import { assert, assertEquals } from 'std/testing/asserts.ts';

import { Collection } from 'infra/data/collection.ts';
import { LocalStorage } from 'infra/data/local-storage.ts';
import { UserDTO } from 'infra/dtos/user-dto.ts';

const user: UserDTO = {
  id: crypto.randomUUID(),
  name: 'John',
  password: '12345678',
  email: 'john@email.com',
  accountId: crypto.randomUUID(),
};

Deno.test('testing local storage', async (p) => {
  await p.step('save item in local storage and retrieve it correctly', () => {
    // given
    const collection = Collection.USERS;
    LocalStorage.deleteAll(collection);

    // when
    LocalStorage.add<UserDTO>(collection, user);
    const users = LocalStorage.list<UserDTO>(collection);

    // then
    assert(users.length === 1);
    assertEquals(JSON.stringify(users[0]), JSON.stringify(user));
  });

  await p.step('delete all items from local storage', () => {
    // given
    const collection = Collection.USERS;

    // when
    LocalStorage.add<UserDTO>(collection, user);
    LocalStorage.add<UserDTO>(collection, user);
    LocalStorage.deleteAll(Collection.USERS);
    const users = LocalStorage.list<UserDTO>(collection);

    // then
    assert(users.length === 0);
  });

  await p.step('get user by email in local storage', () => {
    // given
    const collection = Collection.USERS;
    LocalStorage.deleteAll(collection);

    // when
    LocalStorage.add<UserDTO>(collection, user);
    const retriviedUser = LocalStorage.getBy<UserDTO>(
      collection,
      'email',
      user.email,
    );

    // then
    assert(retriviedUser);
    assertEquals(retriviedUser?.email, user.email);
  });

  await p.step('delete user by email in local storage', () => {
    // given
    const collection = Collection.USERS;
    LocalStorage.deleteAll(collection);

    // when
    LocalStorage.add<UserDTO>(collection, user);
    LocalStorage.deleteBy<UserDTO>(
      collection,
      'email',
      user.email,
    );
    const users = LocalStorage.list(collection);
    const retriviedUser = LocalStorage.getBy<UserDTO>(
      collection,
      'email',
      user.email,
    );

    // then
    assert(users.length === 0);
    assertEquals(retriviedUser, null);
  });

  await p.step('should update user', async () => {
    //given
    const collection = Collection.USERS;
    LocalStorage.deleteAll(collection);
    const updatedUser = {
      ...user,
      name: 'John Doe',
    };

    // when
    await LocalStorage.add<UserDTO>(collection, user);
    await LocalStorage.update<UserDTO>(collection, user.id, updatedUser);
    const retriviedUser = await LocalStorage.getBy<UserDTO>(
      collection,
      'id',
      user.id,
    );

    // then
    assertEquals(retriviedUser, updatedUser);
  });
});
