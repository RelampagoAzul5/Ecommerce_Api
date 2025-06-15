import addressController from '../..//controllers/user/addresses.controller';
import { Router } from 'express';
import { authMiddleware } from '../..//middlewares/authMuddleware';

const router = Router();
router.post(
  '/addresses/register',
  authMiddleware,
  addressController.createAddress,
);
router.get('/addresses/', authMiddleware, addressController.getAddresses);
router.get('/address/:addressId', authMiddleware, addressController.getAddress);
router.put(
  '/addresses/:addressId/update',
  authMiddleware,
  addressController.updateAddress,
);
router.delete(
  '/addresses/:addressId/delete',
  authMiddleware,
  addressController.deleteAddress,
);
export default router;
