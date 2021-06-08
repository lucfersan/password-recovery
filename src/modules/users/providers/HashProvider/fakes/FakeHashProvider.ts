import { IHashProvider } from '../models/IHashProvider';

export class FakeHashProvider implements IHashProvider {
  public async generateHash(text: string): Promise<string> {
    return text;
  }

  public async compareHash(text: string, hash: string): Promise<boolean> {
    return text === hash;
  }
}
