import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

export class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);
    const { user, token } = await authenticateUserService.authenticateUser({
      email,
      password,
    });

    return response.status(201).json({
      user: classToClass(user),
      token,
    });
  }
}
