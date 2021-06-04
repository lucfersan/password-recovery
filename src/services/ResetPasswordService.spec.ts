import { compare } from 'bcryptjs';
import { v4 } from 'uuid';
import { AppError } from '../errors/AppError';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { FakeUserTokensRepository } from '../repositories/fakes/FakeUserTokensRepository';
import { ResetPasswordService } from './ResetPasswordService';
import { UsersService } from './UsersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let usersService: UsersService;
let resetPasswordService: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    usersService = new UsersService(fakeUsersRepository);
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await usersService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generateToken(user.id);

    await resetPasswordService.resetPassword({
      token,
      password: '123123',
    });

    expect(await compare('123123', user.password)).toBe(true);
  });

  it('should not be able to reset the password with a non-existing token', async () => {
    await usersService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      resetPasswordService.resetPassword({
        token: 'non-existing-token',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password of a non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generateToken(v4());

    await expect(
      resetPasswordService.resetPassword({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if the token expired (+2h)', async () => {
    const user = await usersService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generateToken(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const expiredDate = new Date();

      return expiredDate.setHours(expiredDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.resetPassword({
        token,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
