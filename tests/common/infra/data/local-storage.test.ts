import { assert, assertEquals } from 'std/testing/asserts.ts';

import { Collection } from 'infra/data/collection.ts';
import { LocalStorage } from 'infra/data/local-storage.ts';
import { UserDTO } from 'domain/entities/user-dto.ts';

Deno.test('testing local storage', async (p) => {
  await p.step('save item in local storage and retrieve it correctly', () => {
    // given
    const collection = Collection.USERS;
    LocalStorage.deleteAll(collection);

    const user = {
      id: crypto.randomUUID(),
      name: 'John',
      password: '12345678',
      email: 'john@gmail.com',
    };

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

    const user = {
      id: crypto.randomUUID(),
      name: 'John',
      password: '12345678',
      email: 'john@gmail.com',
    };

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

    const user = {
      id: crypto.randomUUID(),
      name: 'John',
      password: '12345678',
      email: 'john@gmail.com',
    };

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

    const user = {
      id: crypto.randomUUID(),
      name: 'John',
      password: '12345678',
      email: 'john@gmail.com',
    };

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
});
