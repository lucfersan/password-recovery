import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordService } from '../services/ResetPasswordService';

export class ResetPasswordsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.resetPassword({
      token,
      password,
    });

    return response.status(204).json();
  }
}
