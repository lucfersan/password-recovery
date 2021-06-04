import { inject, injectable } from 'tsyringe';
import { AppError } from '../errors/AppError';
import { IMailProvider } from '../providers/MailProvider/models/IMailProvider';
import { IUsersRepository } from '../repositories/types/IUsersRepository';
import { IUserTokensRepository } from '../repositories/types/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
export class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist.', 404);
    }

    const { token } = await this.userTokensRepository.generateToken(user.id);

    await this.mailProvider.sendMail(
      email,
      `Request to password recover received! Token: ${token}`,
    );
  }
}
