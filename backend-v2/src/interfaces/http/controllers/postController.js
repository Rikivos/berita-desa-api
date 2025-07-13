import { MongoPostRepository } from '../../../infrastructure/mongodb/mongoPostRepository.js';
import { GetAllPost } from '../../../usecases/post/getAllPost.js';
// import { GetPost } from '../../../usecases/post/getPost.js';
import { CreatePost } from '../../../usecases/post/createPost.js';
// import { UpdatePost } from '../../../usecases/post/updatePost.js';
// import { DeletePost } from '../../../usecases/post/deletePost.js';

const postRepo = new MongoPostRepository();
const getAllPost = new GetAllPost(postRepo);
// const getPost = new GetPost(postRepo);
const createPost = new CreatePost({ postRepository: postRepo });
// const updatePost = new UpdatePost(postRepo);
// const deletePost = new DeletePost(postRepo);

const createPostController = async (req, res) => {
    const { title, content, image, status, userId, category } = req.body;
    try {
        const post = await createPost.execute({ title, content, image, status, userId, category });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllPostController = async (req, res) => {
    try {
        const posts = await getAllPost.execute();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createPostController, getAllPostController };