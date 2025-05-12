import { createUser, getUser } from '../controllers/user.controller';
import { Router } from 'express';

const router = Router();
router.post('/register', createUser);
router.get('/:id', getUser);
export default router;
