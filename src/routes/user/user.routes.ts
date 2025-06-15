import { upload } from '../../middlewares/uploadMiddleware';
import userController from '../../controllers/user/user.controller';
import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMuddleware';

const router = Router();
router.post('/register', upload.single('avatar'), userController.createUser);
router.get('/:id', userController.getUser);
router.delete('/delete', authMiddleware, userController.deleteUser);
router.put('/update', authMiddleware, userController.updateUser);
export default router;
