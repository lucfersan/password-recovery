import { container } from 'tsyringe';
import { EtherealMailProvider } from '../providers/MailProvider/implementations/EtherealMailProvider';
import { IMailProvider } from '../providers/MailProvider/models/IMailProvider';
import { IUsersRepository } from '../repositories/types/IUsersRepository';
import { IUserTokensRepository } from '../repositories/types/IUserTokensRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import { UserTokensRepository } from '../repositories/UserTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
