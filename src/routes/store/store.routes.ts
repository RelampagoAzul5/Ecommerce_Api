import { upload } from '../../middlewares/uploadMiddleware';
import storeController from '../../controllers/store/store.controller';
import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMuddleware';

const router = Router();
router.post(
  '/register',
  authMiddleware,
  upload.single('StoreAvatar'),
  storeController.createStore,
);
router.get('/:id', storeController.getStore);
router.delete('/delete', authMiddleware, storeController.deleteStore);
router.put('/update', authMiddleware, storeController.updateStore);
export default router;
