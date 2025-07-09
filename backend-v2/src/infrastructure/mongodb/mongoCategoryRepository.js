import { CategoryRepository } from '../../domain/category/categoryRepository.js';
import { model, Schema } from "mongoose";

const CategorySchema = new Schema({
    name: String,
    slug: String,
}, { timestamps: true });

const CategoryModel = model('Category', CategorySchema);

export class MongoCategoryRepository extends CategoryRepository {
    async create(category) {
        const newCategory = await CategoryModel.create(category);
        return {
            id: newCategory._id,
            name: newCategory.name,
            slug: newCategory.slug,
        };
    }

    async findAll() {
        const categories = await CategoryModel.find();
        return categories.map(cat => ({
            id: cat._id,
            name: cat.name,
            slug: cat.slug,
        }));
    }

    async findById(id) {
        const category = await CategoryModel.findById(id);
        if (!category) return null;
        return {
            id: category._id,
            name: category.name,
            slug: category.slug,
        };
    }
}
