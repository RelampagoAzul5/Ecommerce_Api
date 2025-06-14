import { Router } from 'express';
import userRoutes from './user/user.routes';
import addressRoutes from './user/address.routes';
import userAvatarRoutes from './user/userAvatar.routes';
import loginRoutes from './user/userlogin.routes';
import storeRoutes from './store/store.routes';
import storeAvatarRoutes from './store/storeAvatar.routes';

const router = Router();
router.use('/user', userRoutes);
router.use('/user', addressRoutes);
router.use('/user', userAvatarRoutes);
router.use('/auth', loginRoutes);

router.use('/store', storeRoutes);
router.use('/store', storeAvatarRoutes);
export default router;
