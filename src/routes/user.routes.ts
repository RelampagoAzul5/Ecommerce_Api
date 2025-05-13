import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();
router.post('/register', createUser);
router.get('/:id', getUser);
router.delete('/delete/:id', deleteUser);
router.put('/update/:id', updateUser);
export default router;
