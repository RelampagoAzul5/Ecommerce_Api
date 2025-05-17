import { upload } from '../middlewares/uploadMiddleware';
import userController from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();
router.post('/register', upload.single('avatar'), userController.createUser);
router.get('/:id', userController.getUser);
router.delete('/delete/:id', userController.deleteUser);
router.put('/update/:id', userController.updateUser);
export default router;
