import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';

export interface IUsersRepository {
  showAllUsers: () => Promise<User[]>;
  create: (data: ICreateUserDTO) => Promise<User>;
  delete: (id: string) => Promise<void>;
  update: (user: User) => Promise<User>;
  findByEmail: (email: string) => Promise<User | undefined>;
  findById: (id: string) => Promise<User | undefined>;
}
