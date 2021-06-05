import { Router } from 'express';

import { passwordsRoutes } from '@modules/users/infra/http/routes/passwords.routes';
import { sessionsRoutes } from '@modules/users/infra/http/routes/sessions.routes';
import { usersRoutes } from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/passwords', passwordsRoutes);

export { routes };
