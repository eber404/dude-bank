import { UserDTO } from 'user/domain/entities/user-dto.ts';
import { GetUserByEmailRepository } from 'user/domain/repositories/user-repository.ts';

import { LocalStorage } from 'common/infra/data/local-storage.ts';
import { Collection } from 'common/infra/data/collection.ts';

export class GetUserByEmailRepositoryLocal implements GetUserByEmailRepository {
  async getByEmail(email: string): Promise<UserDTO | null> {
    const user = await LocalStorage.getBy<UserDTO>(
      Collection.USERS,
      'email',
      email,
    );

    return user ?? null;
  }
}
