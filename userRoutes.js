import express from 'express';
import { getAllUsers, loginController, registerController } from '../controller/user-controller.js';
//import { signupUser } from '../controller/user-controller.js';
const router = express.Router()
router.get('/all-users', getAllUsers)
router.post('/register', registerController)
router.post('/login', loginController)
export default router;