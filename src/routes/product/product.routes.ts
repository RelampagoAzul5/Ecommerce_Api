import { upload } from '../../middlewares/uploadMiddleware';
import productController from '../../controllers/product/product.controller';
import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMuddleware';

const router = Router();
router.post(
  '/register',
  authMiddleware,
  upload.array('ProductImage'),
  productController.createProduct,
);
router.get('/:id', productController.getProduct);
router.delete(
  '/delete/:productId',
  authMiddleware,
  productController.deleteProduct,
);
router.put(
  '/update/:productId',
  authMiddleware,
  productController.updateProduct,
);
export default router;
