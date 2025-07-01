import productImagesController from '../../controllers/product/productImages.controller';
import { upload } from '../../middlewares/uploadMiddleware';
import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMuddleware';

const router = Router();
router.post(
  '/:productId/images/register',
  upload.array('ProductImages', 6),
  authMiddleware,
  productImagesController.uploadImages,
);
router.get('/:productId/images/', productImagesController.getAllImages);
router.get('/:productId/images/:imageId', productImagesController.getImage);
router.delete(
  '/:productId/images/delete/:imageId',
  authMiddleware,
  productImagesController.deleteImage,
);
router.delete(
  '/:productId/images/delete',
  authMiddleware,
  productImagesController.deleteAllImages,
);
export default router;
