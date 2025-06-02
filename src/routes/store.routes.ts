import { upload } from '../middlewares/uploadMiddleware';
import userController from '../controllers/user.controller';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMuddleware';

const router = Router();
router.post(
  '/register/:userId',
  authMiddleware,
  upload.single('StoreAvatar'),
  userController.createUser,
);
router.get('/:id', userController.getUser);
router.delete('/delete/:id', authMiddleware, userController.deleteUser);
router.put('/update/:id', authMiddleware, userController.updateUser);
export default router;
