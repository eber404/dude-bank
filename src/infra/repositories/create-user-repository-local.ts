import { CreateUserRepository } from 'domain/repositories/user-repository.ts';
import { User } from 'domain/entities/user.ts';

import { LocalStorage } from 'infra/data/local-storage.ts';
import { Collection } from 'infra/data/collection.ts';
import { UserMapper } from 'infra/mappers/user-mapper.ts';

export class CreateUserRepositoryLocal implements CreateUserRepository {
  async create(user: User): Promise<void> {
    const userDTO = UserMapper.fromDomain(user);

    await LocalStorage.add(Collection.USERS, userDTO);
  }
}
