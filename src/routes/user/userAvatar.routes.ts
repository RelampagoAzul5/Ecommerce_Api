import userAvatarController from '../..//controllers/user/userAvatar.controller';
import { upload } from '../../middlewares/uploadMiddleware';
import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMuddleware';

const router = Router();
router.post(
  '/:userId/avatar/register',
  upload.single('avatar'),
  authMiddleware,
  userAvatarController.uploadAvatar,
);
router.get('/:userId/avatar/', userAvatarController.getAvatar);
router.delete(
  '/:userId/avatar/delete',
  authMiddleware,
  userAvatarController.deleteAvatar,
);
export default router;
