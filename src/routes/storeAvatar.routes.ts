import storeAvatarController from '../controllers/storeAvatar.controller';
import { upload } from '../middlewares/uploadMiddleware';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMuddleware';

const router = Router();
router.post(
  '/:userId/:storeId/avatar/register',
  upload.single('avatar'),
  authMiddleware,
  storeAvatarController.uploadAvatar,
);
router.get('/:storeId/avatar/', storeAvatarController.getAvatar);
router.delete(
  '/:storeId/avatar/delete',
  authMiddleware,
  storeAvatarController.deleteAvatar,
);
export default router;
