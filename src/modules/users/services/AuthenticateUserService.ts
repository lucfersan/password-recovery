import { jwtConfig } from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { User } from '../infra/typeorm/entities/User';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../repositories/types/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async authenticateUser({
    email,
    password,
  }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const isPasswordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { expiresIn, secret } = jwtConfig;

    const token = sign({}, secret, {
      expiresIn,
      subject: user.id,
    });

    return {
      user,
      token,
    };
  }
}
