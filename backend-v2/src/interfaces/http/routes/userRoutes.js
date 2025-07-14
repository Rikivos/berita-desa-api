import express from 'express';
import { createUserHandler, loginUserHandler, registerController, getAllUserController } from '../controllers/UserController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { isAdminMiddleware } from '../middleware/isAdminMiddleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginUserHandler);
router.post('/user', authMiddleware, isAdminMiddleware, createUserHandler);
router.get('/users', authMiddleware, isAdminMiddleware, getAllUserController);


export default router;
