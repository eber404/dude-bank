import { CreateUserRepository } from 'user/domain/repositories/user-repository.ts';
import { CreateUserDTO } from 'user/application/dtos/create-user-dto.ts';

import { LocalStorage } from 'common/infra/data/local-storage.ts';
import { Collection } from 'common/infra/data/collection.ts';

export class CreateUserRepositoryLocal implements CreateUserRepository {
  async create(user: CreateUserDTO): Promise<void> {
    const userWithId = {
      id: crypto.randomUUID(),
      ...user,
    };

    await LocalStorage.add(Collection.USERS, userWithId);
  }
}
