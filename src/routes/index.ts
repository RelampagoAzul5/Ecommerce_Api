import { Router } from 'express';
import userRoutes from './user.routes';
import addressRoutes from './address.routes';
import userAvatarRoutes from './userAvatar.routes';
import loginRoutes from './userlogin.routes';
import storeRoutes from './store.routes';
import storeAvatarRoutes from './storeAvatar.routes';

const router = Router();
router.use('/user', userRoutes);
router.use('/user', addressRoutes);
router.use('/user', userAvatarRoutes);
router.use('/auth', loginRoutes);

router.use('/store', storeRoutes);
router.use('/store', storeAvatarRoutes);
export default router;
