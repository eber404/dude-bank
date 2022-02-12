import { User } from 'user/domain/entities/user.ts';

export interface CreateUserRepository {
  create(user: Omit<User, 'id'>): Promise<void>;
}

export interface ListUsersRepository {
  list(): Promise<User[]>;
}

export interface GetUserByEmailRepository {
  getByEmail(email: string): Promise<User | null>;
}

export interface GetUserByIdRepository {
  getById(id: string): Promise<User | null>;
}
