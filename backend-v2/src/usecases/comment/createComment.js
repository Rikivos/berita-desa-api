export class CreateComment {
  constructor({ commentRepository }) {
    this.commentRepository = commentRepository;
  }

  async execute({ post, user, content, parent = null }) {
    if (!content || typeof content !== 'string' || content.length < 3) {
      throw new Error('Comment must be at least 3 characters.');
    }

    const comment = {
      post,
      user,
      content,
      parent,
    };

    return await this.commentRepository.create(comment);
  }
}
