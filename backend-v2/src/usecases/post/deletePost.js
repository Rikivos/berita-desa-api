export class DeletePost {
        constructor(postRepository) {
            this.postRepository = postRepository;
        }
    
        async handle(req, res, next) {
            try {
                const { id } = req.params;
    
                const result = await this.postRepository.delete(id);
    
                if (!result) {
                    return res.status(404).json({ message: 'Post not found.' });
                }
    
                return res.status(200).json({ message: 'Post deleted successfully.' });
            } catch (err) {
                next(err);
            }
        }
    }