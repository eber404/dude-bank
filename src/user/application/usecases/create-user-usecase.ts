import { User } from 'user/domain/entities/user.ts';
import {
  CreateUserRepository,
  GetUserByEmailRepository,
} from 'user/domain/repositories/user-repository.ts';
import {
  Notification,
  NotificationType,
} from 'common/domain/singletons/notification.ts';
import { CreateUser } from 'user/domain/usecases/create-user.ts';
import { CreateUserDTO } from 'user/application/dtos/create-user-dto.ts';

import { CreateAccountRepository } from 'account/domain/repositories/account-repository.ts';
import { Account } from '../../../account/domain/entities/account.ts';

export class CreateUserUseCase implements CreateUser {
  constructor(
    private readonly createUserRepository: CreateUserRepository,
    private readonly getUserByEmailRepository: GetUserByEmailRepository,
    private readonly createAccountRepository: CreateAccountRepository,
  ) {}

  async execute(props: CreateUserDTO): Promise<void> {
    const user = new User(props);

    if (!user.isValid()) return;

    const userAlreadyExists = await this.getUserByEmailRepository.getByEmail(
      user.email,
    );

    if (userAlreadyExists) {
      return Notification.add({
        message: 'use a different email address',
        type: NotificationType.ERROR,
      });
    }

    await this.createUserRepository.create(user);

    const account = new Account({
      balance: 1000,
      user,
    });

    await this.createAccountRepository.create(account);
  }
}
