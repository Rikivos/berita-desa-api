import slugify from 'slugify';

export class CreatePost {
  constructor({ postRepository }) {
    this.postRepository = postRepository;
  }

  async execute({ title, content, image, status, userId, category }) {
    if (!title || typeof title !== 'string') {
      throw new Error('Title is required and must be a string.');
    }

    if (!content || typeof content !== 'string') {
      throw new Error('Content is required and must be a string.');
    }

    const slug = slugify(title, { lower: true, strict: true });

    const post = {
      title,
      slug,
      image,
      content,
      status,
      user: userId,
      category
    };

    return await this.postRepository.create(post);
  }
}
