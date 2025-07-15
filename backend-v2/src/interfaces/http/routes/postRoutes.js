import express from 'express';
import multer from 'multer';
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
const storage = multer.memoryStorage(); // Menyimpan gambar dalam memory
const upload = multer({ storage: storage });

router.post('/post', authMiddleware, isAdminMiddleware, upload.single("image"), createPostController);
router.put('/post/:id', authMiddleware, isAdminMiddleware,  upload.single("image"), updatePostController);
router.delete('/post/:id', authMiddleware, isAdminMiddleware, deletePostController);
router.get('/post/:id', getPostController);
router.get('/posts', getAllPostController);

export default router;