export class GetAllComments {
  constructor({ commentRepository }) {
    this.commentRepository = commentRepository;
  }

  async execute(postId) {
    const comments = await this.commentRepository.getAllComments(postId);
    
    const map = {};
    const roots = [];

    comments.forEach(c => {
      const comment = c.toObject ? c.toObject() : c; // jaga-jaga kalau sudah plain object
      comment.children = [];
      map[comment._id] = comment;
    });

    comments.forEach(c => {
      const comment = c.toObject ? c.toObject() : c;
      if (comment.parent) {
        const parent = map[comment.parent._id];
        if (parent) {
          parent.children.push(map[comment._id]);
        }
      } else {
        roots.push(map[comment._id]);
      }
    });

    return roots;
  }
}
