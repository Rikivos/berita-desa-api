export class GetAllComments {
  constructor({ commentRepository }) {
    this.commentRepository = commentRepository;
  }

  async execute(postId) {
    if (!postId) throw new Error("postId is required");
    return await this.commentRepository.getAllComments(postId);
  }
}