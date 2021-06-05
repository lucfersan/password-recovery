import { Router } from 'express';
import { ForgotPasswordsController } from '../controllers/ForgotPasswordsController';
import { ResetPasswordsController } from '../controllers/ResetPasswordsController';

const passwordsRoutes = Router();
const forgotPasswordsController = new ForgotPasswordsController();
const resetPasswordsController = new ResetPasswordsController();

passwordsRoutes.post('/forgot', forgotPasswordsController.create);
passwordsRoutes.post('/reset', resetPasswordsController.update);

export { passwordsRoutes };
