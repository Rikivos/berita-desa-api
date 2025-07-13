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

router.post("/category",authMiddleware, isAdminMiddleware, createCategoryController);
router.put("/category/:id", authMiddleware, isAdminMiddleware, updateCategory);
router.delete("/category/:id", authMiddleware, isAdminMiddleware, deleteCategory);
router.get("/category/:id", getCategory);
router.get("/categories", getAllCategory);

export default router;
