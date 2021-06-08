import { inject, injectable } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';

import { IUsersRepository } from '../repositories/types/IUsersRepository';
import { IUserTokensRepository } from '../repositories/types/IUserTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async resetPassword({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token is missing.', 401);
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist.', 404);
    }

    const tokenCreatedAt = userToken.created_at;
    const tokenDateLimit = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), tokenDateLimit)) {
      throw new AppError('Token expired.', 401);
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.update(user);
  }
}
