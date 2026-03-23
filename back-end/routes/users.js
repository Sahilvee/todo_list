import { Router } from "express";
import {users,updateUser} from '../controllers/users.js'
const router=Router();
router.get('/:id',users);

router.patch('/:id',updateUser);
export default router;