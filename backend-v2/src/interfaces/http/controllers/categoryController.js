import { MongoCategoryRepository } from '../../../infrastructure/mongodb/mongoCategoryRepository.js';
import { MongoPostRepository } from '../../../infrastructure/mongodb/mongoPostRepository.js';
import { GetAllCategory } from '../../../usecases/category/getAllCategory.js';
import { GetCategory } from '../../../usecases/category/getCategory.js';
import { CreateCategory } from '../../../usecases/category/createCategory.js';
import { UpdateCategory } from '../../../usecases/category/updateCategory.js';
import { DeleteCategory } from '../../../usecases/category/deleteCategory.js';

const categoryRepo = new MongoCategoryRepository();
const postRepo = new MongoPostRepository();
const createCategory = new CreateCategory(categoryRepo);
const getAllCategory = new GetAllCategory(categoryRepo);

const getAllCategoryController = async (req, res) => {
    try {
        const posts = await getAllCategory.execute();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategory = (req, res, next) => {
  const handler = new GetCategory(categoryRepo);
  return handler.handle(req, res, next);
};
const createCategoryController = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.id; 

    const result = await createCategory.execute({ name, userId });

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const updateCategory = (req, res, next) => {
  const handler = new UpdateCategory(categoryRepo);
  return handler.handle(req, res, next);
};

const deleteCategory = (req, res, next) => {
  const handler = new DeleteCategory({
    categoryRepository: categoryRepo,
    postRepository: postRepo
  });
  return handler.handle(req, res, next);
};

export { getAllCategoryController, getCategory, createCategoryController, updateCategory, deleteCategory };
