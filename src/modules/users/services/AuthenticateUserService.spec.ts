import { AppError } from '@shared/errors/AppError';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { AuthenticateUserService } from './AuthenticateUserService';
import { UsersService } from './UsersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let usersService: UsersService;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    usersService = new UsersService(fakeUsersRepository, fakeHashProvider);
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate a user', async () => {
    const user = await usersService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const auth = await authenticateUserService.authenticateUser({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(auth).toHaveProperty('user');
    expect(auth.user).toEqual(user);
    expect(auth).toHaveProperty('token');
  });

  it('should not be able to authenticate a user that does not exist', async () => {
    await expect(
      authenticateUserService.authenticateUser({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user that has entered the wrong password', async () => {
    await usersService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      authenticateUserService.authenticateUser({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
