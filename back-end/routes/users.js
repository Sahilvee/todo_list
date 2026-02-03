import { Router } from "express";
import {users} from '../controllers/users.js'
const router=Router();
router.get('/:id',users);
 
export default router;