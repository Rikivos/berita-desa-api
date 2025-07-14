import express from 'express';
import {
    createPostController,
    updatePostController,
    deletePostController,
    getAllPostController,
    getPostController,
} from '../controllers/postController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { isAdminMiddleware } from '../middleware/isAdminMiddleware.js';

const router = express.Router();

router.post('/post', authMiddleware, isAdminMiddleware, createPostController);
router.put('/post/:id', authMiddleware, isAdminMiddleware, updatePostController);
router.delete('/post/:id', authMiddleware, isAdminMiddleware, deletePostController);
router.get('/post/:id', getPostController);
router.get('/posts', getAllPostController);

export default router;