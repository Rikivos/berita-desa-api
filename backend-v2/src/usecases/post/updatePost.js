import slugify from "slugify";

export class UpdatePost {
    async execute({ id, title, content, status, userId, image, category }) {
        if (!title || typeof title !== "string") {
            throw new Error("Title is required and must be a string.");
        }
    
        if (!content || typeof content !== "string") {
            throw new Error("Content is required and must be a string.");
        }

        if (!status) {
            throw new Error("Status is required to update post.");
        }

        if (!category) {
            throw new Error("Category is required to update post.");
        }

        if (!image) {
            throw new Error("Image is required to update post.");
        }
    
        const slug = slugify(title, { lower: true, strict: true });
    
        return await this.postRepository.update(id, { title, slug, content, status, user: userId, image, category });
    }
}