import { compare } from 'bcryptjs';
import { v4 } from 'uuid';
import { AppError } from '../errors/AppError';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { UsersService } from './UsersService';

let fakeUsersRepository: FakeUsersRepository;
let usersService: UsersService;

describe('Users', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    usersService = new UsersService(fakeUsersRepository);
  });

  it('should be able to show all users', async () => {
    const user = await usersService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const users = await usersService.showAllUsers();

    expect(users).toEqual([user]);
  });

  it('should be able to create a new user', async () => {
    const user = await usersService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('created_at');
    expect(user).toHaveProperty('updated_at');
  });

  it('should not be able to create two users with the same email', async () => {
    await usersService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      usersService.createUser({
        name: 'John Doe II',
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update a user using the id', async () => {
    const user = await usersService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await usersService.updateUser(user.id, {
      name: 'John Doe II',
      email: 'johndoeii@example.com',
      password: '123123',
    });

    expect(user.name).toBe('John Doe II');
    expect(user.email).toBe('johndoeii@example.com');
    expect(await compare('123123', user.password)).toBe(true);
  });

  it('should not be able to update a user with an invalid id', async () => {
    await expect(
      usersService.updateUser('invalid-id', {
        name: 'John Doe II',
        email: 'johndoeii@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a non-existing user', async () => {
    await expect(
      usersService.updateUser(v4(), {
        name: 'John Doe II',
        email: 'johndoeii@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user with an email that belongs to another one', async () => {
    await usersService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user = await usersService.createUser({
      name: 'John Doe II',
      email: 'johndoeii@example.com',
      password: '123123',
    });

    await expect(
      usersService.updateUser(user.id, {
        name: 'John Doe The Second',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a user using the id', async () => {
    const user = await usersService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await usersService.deleteUser(user.id);

    const deletedUser = await fakeUsersRepository.findById(user.id);

    expect(deletedUser).toBe(undefined);
  });

  it('should not be able to delete a user with an invalid id', async () => {
    await expect(usersService.deleteUser('invalid-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to delete a non-existing user', async () => {
    await expect(usersService.deleteUser(v4())).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
