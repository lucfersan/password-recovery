import { FakeMailProvider } from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import { AppError } from '@shared/errors/AppError';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';

import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { FakeUserTokensRepository } from '../repositories/fakes/FakeUserTokensRepository';
import { SendForgotPasswordEmailService } from './SendForgotPasswordEmailService';
import { UsersService } from './UsersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let fakeHashProvider: FakeHashProvider;
let usersService: UsersService;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeHashProvider = new FakeHashProvider();

    usersService = new UsersService(fakeUsersRepository, fakeHashProvider);
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to recover the password using email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await usersService.createUser({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'johndoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover the password of a non-existing user', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
