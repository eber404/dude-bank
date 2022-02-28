import { CreateUserRepository } from 'domain/repositories/user-repository.ts';

import { CreateUserDTO } from 'application/dtos/create-user-dto.ts';

import { LocalStorage } from 'infra/data/local-storage.ts';
import { Collection } from 'infra/data/collection.ts';

export class CreateUserRepositoryLocal implements CreateUserRepository {
  async create(user: CreateUserDTO): Promise<void> {
    const userWithId = {
      id: crypto.randomUUID(),
      ...user,
    };

    await LocalStorage.add(Collection.USERS, userWithId);
  }
}
