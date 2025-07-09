import { MongoCategoryRepository } from '../../../infrastructure/mongodb/mongoCategoryRepository.js';
import { GetAllCategory } from '../../../usecases/category/getAllCategory.js';
import { GetCategory } from '../../../usecases/category/getCategory.js';
import { CreateCategory } from '../../../usecases/category/createCategory.js';
import { UpdateCategory } from '../../../usecases/category/updateCategory.js';
import { DeleteCategory } from '../../../usecases/category/deleteCategory.js';

const categoryRepo = new MongoCategoryRepository();

const getAllCategory = (req, res, next) => {
  const handler = new GetAllCategory(categoryRepo);
  return handler.handle(req, res, next);
};

const getCategory = (req, res, next) => {
  const handler = new GetCategory(categoryRepo);
  return handler.handle(req, res, next);
};

const createCategory = (req, res, next) => {
  const handler = new CreateCategory(categoryRepo);
  return handler.handle(req, res, next);
};

const updateCategory = (req, res, next) => {
  const handler = new UpdateCategory(categoryRepo);
  return handler.handle(req, res, next);
};

const deleteCategory = (req, res, next) => {
  const handler = new DeleteCategory(categoryRepo);
  return handler.handle(req, res, next);
};

export { getAllCategory, getCategory, createCategory, updateCategory, deleteCategory };
