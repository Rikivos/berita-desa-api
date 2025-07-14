import express from "express";
import {
  createCategoryController,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
} from "../controllers/categoryController.js";
import { authMiddleware } from '../middleware/authMiddleware.js';
import { isAdminMiddleware } from '../middleware/isAdminMiddleware.js';

const router = express.Router();

router.post("/categories", authMiddleware, isAdminMiddleware, createCategoryController);
router.put("/categories/:id", authMiddleware, isAdminMiddleware, updateCategory);
router.delete("/categories/:id", authMiddleware, isAdminMiddleware, deleteCategory);
router.get("/categories/:id", getCategory);
router.get("/categories", getAllCategory);

export default router;
