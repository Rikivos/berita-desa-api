import express from "express";
import {
    createCommentController,
    getAllCommentsController
} from "../controllers/commentController.js";
import { authMiddleware } from '../middleware/authMiddleware.js';
import { isAdminMiddleware } from '../middleware/isAdminMiddleware.js';

const router = express.Router();

router.get('/post/:postId/comments', getAllCommentsController);
router.post("/post/:postId/comments", authMiddleware, createCommentController);

export default router;
