import express from 'express';
import {
    createPostController,
    // updatePost,
    // deletePost,
    getAllPostController,
    // getPost,
} from '../controllers/postController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { isAdminMiddleware } from '../middleware/isAdminMiddleware.js';

const router = express.Router();

router.post('/post', createPostController);
// router.put('/post/:id', authMiddleware, isAdminMiddleware, updatePost);
// router.delete('/post/:id', authMiddleware, isAdminMiddleware, deletePost);
// router.get('/post/:id', getPost);
router.get('/posts', getAllPostController);

export default router;