import { UsersService } from '@modules/users/services/UsersService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const usersService = container.resolve(UsersService);
    const users = await usersService.showAllUsers();
    return response.json(classToClass(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const usersService = container.resolve(UsersService);
    const user = await usersService.createUser({ name, email, password });

    return response.status(201).json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = request.user.id;
    const { name, email, password } = request.body;

    const usersService = container.resolve(UsersService);
    const user = await usersService.updateUser(id, { name, email, password });

    return response.json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.user.id;

    const usersService = container.resolve(UsersService);
    await usersService.deleteUser(id);

    return response.status(204).json();
  }
}
