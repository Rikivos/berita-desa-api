// usecase/category/CreateCategory.js
import slugify from 'slugify';
import { Category } from '../../domain/category/Category.js';

export class CreateCategory {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async execute({ name, userId }) {
        if (!name || typeof name !== 'string') {
            throw new Error('Name is required and must be a string.');
        }

        if (!userId) {
            throw new Error('User ID is required to create category.');
        }

        const slug = slugify(name, { lower: true, strict: true });

        // Sertakan userId dalam entitas category
        const category = new Category({ name, slug, user: userId });

        const result = await this.categoryRepository.create(category);
        return result;
    }
}
