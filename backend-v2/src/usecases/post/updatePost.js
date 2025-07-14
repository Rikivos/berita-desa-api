import slugify from "slugify";

export class UpdatePost {

    constructor({ postRepository }) {
        this.postRepository = postRepository;
    }

    async execute({ id, title, content, status, userId, image, category }) {

        const slug = slugify(title, { lower: true, strict: true });
    
        return await this.postRepository.update(id, { title, slug, content, status, user: userId, image, category });
    }
}