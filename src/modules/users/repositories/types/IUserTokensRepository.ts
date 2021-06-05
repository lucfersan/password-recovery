import { UserToken } from '@modules/users/infra/typeorm/entities/UserToken';

export interface IUserTokensRepository {
  generateToken: (user_id: string) => Promise<UserToken>;
  findByToken: (token: string) => Promise<UserToken | undefined>;
}
