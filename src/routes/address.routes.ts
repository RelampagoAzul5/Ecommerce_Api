import addressController from '../controllers/addresses.controller';
import { Router } from 'express';

const router = Router();
router.post('/:userId/addresses/register', addressController.createAddress);
router.get('/:userId/addresses/', addressController.getAddress);
router.put(
  '/:userId/addresses/:addressId/update',
  addressController.updateAddress,
);
router.delete(
  '/:userId/addresses/:addressId/delete',
  addressController.deleteAddress,
);
export default router;
