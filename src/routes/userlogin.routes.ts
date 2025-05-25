import loginController from '../controllers/login.controller';
import { Router } from 'express';

const router = Router();

router.get('/', loginController.getLogin);

export default router;
