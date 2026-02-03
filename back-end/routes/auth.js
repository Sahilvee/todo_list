import {Router} from 'express'
import { login } from '../controllers/login.js';
import { signup } from '../controllers/signup.js';

const router=Router();
router.post("/login",login)
router.post("/signup",signup)
export default router;