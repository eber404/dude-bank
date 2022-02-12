import { CreateUserUseCase } from 'user/application/usecases/create-user-usecase.ts';
import { CreateUserController } from 'user/presentation/controllers/create-user-controller.ts';
import { CreateUserRepositoryLocal } from 'user/infra/repositories/create-user-repository-local.ts';
import { GetUserByEmailRepositoryLocal } from 'user/infra/repositories/get-user-by-email-repository-local.ts';

function buildCreateUser(): CreateUserController {
  const createUserRepository = new CreateUserRepositoryLocal();
  const getUserByEmailRepository = new GetUserByEmailRepositoryLocal();
  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserByEmailRepository,
  );
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
}

const createUserController = buildCreateUser();

export { createUserController };
