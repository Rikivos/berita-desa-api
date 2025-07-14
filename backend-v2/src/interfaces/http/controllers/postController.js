import { MongoPostRepository } from '../../../infrastructure/mongodb/mongoPostRepository.js';
import { GetAllPost } from '../../../usecases/post/getAllPost.js';
import { GetPost } from '../../../usecases/post/getPost.js';
import { CreatePost } from '../../../usecases/post/createPost.js';
import { UpdatePost } from '../../../usecases/post/updatePost.js';
import { DeletePost } from '../../../usecases/post/deletePost.js';

const postRepo = new MongoPostRepository();
const getAllPost = new GetAllPost(postRepo);
const getPost = new GetPost(postRepo);
const createPost = new CreatePost({ postRepository: postRepo });
// const updatePost = new UpdatePost(postRepo);
const deletePost = new DeletePost({ postRepository: postRepo });

const createPostController = async (req, res) => {
    
    try {
        const { title} = req.body;
        const { content } = req.body;
        const { image } = req.body;
        const { status } = req.body;
        const  userId  = req.user.id;
        const { category } = req.body;

        const post = await createPost.execute({ title, content, image, status, userId, category });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPostController = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await getPost.execute(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
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

// const updatePostController = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { title } = req.body;
//         const { content } = req.body;
//         const { status } = req.body;
//         const { image } = req.body;
//         const { category } = req.body;
//         const post = await updatePost.execute({ id, title, content, status, image, category });
//         res.status(200).json(post);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

const updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, status, image, category } = req.body;
    const userId = req.user.id; 

    const handler = new UpdatePost({ postRepository: postRepo });
    const post = await handler.execute({ id, title, content, status, userId, image, category });

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deletePostController = (req, res, next) => {
  const handler = new DeletePost(postRepo);
  return handler.handle(req, res, next);
};

export { createPostController, getAllPostController, updatePostController, deletePostController, getPostController };