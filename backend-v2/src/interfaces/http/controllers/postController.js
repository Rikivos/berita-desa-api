import { MongoPostRepository } from '../../../infrastructure/mongodb/mongoPostRepository.js';
import { GetAllPost } from '../../../usecases/post/getAllPost.js';
import { GetPost } from '../../../usecases/post/getPost.js';
import { CreatePost } from '../../../usecases/post/createPost.js';
import { UpdatePost } from '../../../usecases/post/updatePost.js';
import { DeletePost } from '../../../usecases/post/deletePost.js';
import S3Service from '../../../infrastructure/aws/S3Service.js';

const s3Service = new S3Service();
const postRepo = new MongoPostRepository();
const getAllPost = new GetAllPost(postRepo);
const getPost = new GetPost(postRepo);
const createPost = new CreatePost({ postRepository : postRepo, s3Service }); 
const updatePost = new UpdatePost({ postRepository: postRepo, s3Service });
const deletePost = new DeletePost({ postRepository: postRepo });

const createPostController = async (req, res) => {
    try {
      const { title, content, status, category } = req.body;
      const { file } = req;  
      const userId = req.user.id;  
  
      if (!file) {
        return res.status(400).json({ message: "File image is required." });
      }
      // Mengirim data ke use case untuk membuat post
      const post = await createPost.execute({
        title,
        content,
        image: file, 
        status,
        userId,
        category
      });
  
      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message || "Error creating post." });
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

const updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { file } = req; // dari multer

    const title = req.body?.title;
    const content = req.body?.content;
    const status = req.body?.status;
    const category = req.body?.category;
    const image = file || req.body?.image;

    const post = await updatePost.execute({
      id,
      title,
      content,
      status,
      userId,
      image,
      category
    });

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

const deletePostController = (req, res, next) => {
  const handler = new DeletePost(postRepo);
  return handler.handle(req, res, next);
};

export { createPostController, getAllPostController, updatePostController, deletePostController, getPostController };