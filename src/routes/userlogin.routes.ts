import loginController from '../controllers/login.controller';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMuddleware';

const router = Router();

router.get('/login', loginController.getLogin);
router.get('/logout', authMiddleware, loginController.logout);

export default router;
