export interface IHashProvider {
  generateHash: (text: string) => Promise<string>;
  compareHash: (text: string, hash: string) => Promise<boolean>;
}
