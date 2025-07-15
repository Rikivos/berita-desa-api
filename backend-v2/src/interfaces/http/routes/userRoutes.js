import express from 'express';
import { createUserHandler, loginUserHandler, registerController, getAllUserController, updateUserController, deleteUserController } from '../controllers/UserController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { isAdminMiddleware } from '../middleware/isAdminMiddleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginUserHandler);
router.post('/user', authMiddleware, isAdminMiddleware, createUserHandler);
router.put('/user/:id', authMiddleware,updateUserController);
router.get('/users', authMiddleware, isAdminMiddleware, getAllUserController);
router.delete('/user/:id', authMiddleware, isAdminMiddleware, deleteUserController);


export default router;
