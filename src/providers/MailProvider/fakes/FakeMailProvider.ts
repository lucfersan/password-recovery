import { IMailProvider } from '../models/IMailProvider';

interface IMail {
  to: string;
  body: string;
}

export class FakeMailProvider implements IMailProvider {
  private mails: IMail[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.mails.push({ to, body });
  }
}
