import { User } from 'domain/entities/user.ts';

import { UserDTO } from 'infra/dtos/user-dto.ts';
import { AccountDTO } from 'infra/dtos/account-dto.ts';

import { AccountMapper } from './account-mapper.ts';

function fromDomain(user: User): UserDTO {
  return {
    email: user.email,
    id: user.id,
    name: user.name,
    password: user.password,
    accountId: user.account.id,
  };
}

function toDomain(userDTO: UserDTO, accountDto: AccountDTO): User {
  return new User({
    name: userDTO.name,
    email: userDTO.email,
    id: userDTO.id,
    password: userDTO.password,
    account: AccountMapper.toDomain(accountDto),
  });
}

export const UserMapper = {
  fromDomain,
  toDomain,
};
