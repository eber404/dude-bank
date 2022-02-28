import { CreateUserUseCase } from 'application/usecases/create-user-usecase.ts';

import { CreateUserController } from 'presentation/controllers/create-user-controller.ts';

import { CreateUserRepositoryLocal } from 'infra/repositories/create-user-repository-local.ts';
import { GetUserByEmailRepositoryLocal } from 'infra/repositories/get-user-by-email-repository-local.ts';
import { CreateAccountRepositoryLocal } from '../infra/repositories/create-account-repository.ts';

function buildCreateUser(): CreateUserController {
  const createUserRepository = new CreateUserRepositoryLocal();
  const getUserByEmailRepository = new GetUserByEmailRepositoryLocal();
  const createAccountRepository = new CreateAccountRepositoryLocal();
  const createUserUseCase = new CreateUserUseCase({
    createUserRepository,
    getUserByEmailRepository,
    createAccountRepository,
  });
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
}

const createUserController = buildCreateUser();

export { createUserController };
