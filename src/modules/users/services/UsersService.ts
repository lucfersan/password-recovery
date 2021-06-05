import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';
import { hash } from 'bcryptjs';

import { AppError } from '@shared/errors/AppError';
import { User } from '../infra/typeorm/entities/User';
import { IUsersRepository } from '../repositories/types/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export class UsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async showAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.showAllUsers();
    return users;
  }

  public async createUser({ name, email, password }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User already exists.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }

  public async updateUser(
    id: string,
    { name, email, password }: IRequest,
  ): Promise<User> {
    const validateId = validate(id);

    if (!validateId) {
      throw new AppError('The id is not valid.', 401);
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exist.', 404);
    }

    if (user.email !== email) {
      const registeredUserWithNewEmail = await this.usersRepository.findByEmail(
        email,
      );

      if (registeredUserWithNewEmail) {
        throw new AppError('User already registered with this email.', 401);
      }
    }

    user.name = name;
    user.email = email;

    const hashedPassword = await hash(password, 8);
    user.password = hashedPassword;

    await this.usersRepository.update(user);
    return user;
  }

  public async deleteUser(id: string): Promise<void> {
    const validateId = validate(id);

    if (!validateId) {
      throw new AppError('The id is not valid.', 401);
    }

    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new AppError('User does not exist.', 404);
    }

    await this.usersRepository.delete(id);
  }
}
