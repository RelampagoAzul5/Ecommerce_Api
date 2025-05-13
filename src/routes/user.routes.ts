import {
  createUser,
  deleteUser,
  getUser,
} from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();
router.post('/register', createUser);
router.get('/:id', getUser);
router.delete('/delete/:id', deleteUser);
export default router;
