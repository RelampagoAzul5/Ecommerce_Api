import { upload } from '../middlewares/uploadMiddleware';
import storeController from '../controllers/store.controller';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMuddleware';

const router = Router();
router.post(
  '/register/:userId',
  authMiddleware,
  upload.single('StoreAvatar'),
  storeController.createStore,
);
router.get('/:id', storeController.getStore);
router.delete('/delete/:id', authMiddleware, storeController.deleteStore);
router.put('/update/:id', authMiddleware, storeController.updateStore);
export default router;
