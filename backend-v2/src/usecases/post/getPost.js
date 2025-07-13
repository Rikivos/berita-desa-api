export class GetPost {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async execute(id) {
        const post = await this.postRepository.findById(id);
        if (!post) {
            throw new Error('Post not found');
        }
        return {
            id: post.id,
            title: post.title,
            slug: post.slug,
            image: post.image,
            content: post.content,
            status: post.status,
            user: post.user,
            category: post.category
        };
    }

    async handle (req, res, next) {
        try {
            const { id } = req.params;
            const result = await this.execute(id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
}