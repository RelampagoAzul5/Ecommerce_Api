import { Router } from 'express';
import userRoutes from './user.routes';
import addressRoutes from './address.routes';

const router = Router();
router.use('/user', userRoutes);
router.use('/user', addressRoutes);
export default router;
