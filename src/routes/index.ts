import { Router } from 'express';
import userRoutes from './user.routes';
import addressRoutes from './address.routes';
import userAvatarRoutes from './userAvatar.routes';
import loginRoutes from './userlogin.routes';

const router = Router();
router.use('/user', userRoutes);
router.use('/user', addressRoutes);
router.use('/user', userAvatarRoutes);
router.use('/auth', loginRoutes);
export default router;
