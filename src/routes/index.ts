import { Router } from 'express';
import { passwordsRoutes } from './passwords.routes';
import { sessionsRoutes } from './sessions.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/passwords', passwordsRoutes);

export { routes };
