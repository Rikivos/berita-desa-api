import slugify from "slugify";

export class UpdateCategory {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async execute({ id, name }) {
        if (!name || typeof name !== 'string') {
            throw new Error('Name is required and must be a string.');
        }

        const slug = slugify(name, { lower: true, strict: true });
        return await this.categoryRepository.update(id, { name, slug });
    }
}
