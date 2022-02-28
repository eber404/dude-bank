import { GetUserByEmailRepository } from 'domain/repositories/user-repository.ts';
import { User } from 'domain/entities/user.ts';

import { LocalStorage } from 'infra/data/local-storage.ts';
import { Collection } from 'infra/data/collection.ts';

export class GetUserByEmailRepositoryLocal implements GetUserByEmailRepository {
  async getByEmail(email: string): Promise<User | null> {
    const user = await LocalStorage.getBy<User>(
      Collection.USERS,
      'email',
      email,
    );

    return user ?? null;
  }
}
