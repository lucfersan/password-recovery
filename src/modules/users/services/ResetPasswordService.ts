import { inject, injectable } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcryptjs';

import { IUsersRepository } from '../repositories/types/IUsersRepository';
import { IUserTokensRepository } from '../repositories/types/IUserTokensRepository';
import { AppError } from '@shared/errors/AppError';

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

    user.password = await hash(password, 8);

    await this.usersRepository.update(user);
  }
}
