import { CreateUserDTO } from 'application/dtos/create-user-dto.ts';

export interface CreateUser {
  execute(props: CreateUserDTO): Promise<void>;
}
