import userAvatarController from '../controllers/userAvatar.controller';
import { upload } from '../middlewares/uploadMiddleware';
import { Router } from 'express';

const router = Router();
router.post(
  '/:userId/avatar/register',
  upload.single('avatar'),
  userAvatarController.uploadAvatar,
);

export default router;
