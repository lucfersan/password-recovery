import { compare, hash } from 'bcryptjs';
import { IHashProvider } from '../models/IHashProvider';

export class BcryptHashProvider implements IHashProvider {
  public async generateHash(text: string): Promise<string> {
    const hashedText = await hash(text, 8);
    return hashedText;
  }

  public async compareHash(text: string, hash: string): Promise<boolean> {
    const match = await compare(text, hash);
    return match;
  }
}
