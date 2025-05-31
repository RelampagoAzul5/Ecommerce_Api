import addressController from '../controllers/addresses.controller';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMuddleware';

const router = Router();
router.post(
  '/:userId/addresses/register',
  authMiddleware,
  addressController.createAddress,
);
router.get('/:userId/addresses/', authMiddleware, addressController.getAddress);
router.put(
  '/:userId/addresses/:addressId/update',
  authMiddleware,
  addressController.updateAddress,
);
router.delete(
  '/:userId/addresses/:addressId/delete',
  authMiddleware,
  addressController.deleteAddress,
);
export default router;
