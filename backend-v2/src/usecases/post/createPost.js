import slugify from "slugify";
import { Post } from "../../domain/post/Post.js";   

export class CreatePost {
  constructor({ postRepository }) {
    this.postRepository = postRepository;
  }

  async execute({ title, content, image, status, userId, category }) {
    if (!title || typeof title !== "string") {
      throw new Error("Title is required and must be a string.");
    }

    if (!content || typeof content !== "string") {
      throw new Error("Content is required and must be a string.");
    }

    if (!userId) {
      throw new Error("User ID is required to create post.");
    }

    if (!category) {
      throw new Error("Category is required to create post.");
    }

    if (!status) {
      throw new Error("Status is required to create post.");
    }

    if (!image) {
      throw new Error("Image is required to create post.");
    }

    const slug = slugify(title, { lower: true, strict: true });

    const post = new Post({ title, slug, image, content, status, user: userId, category });

    const result = await this.postRepository.create(post);
    return result;
  }
}
