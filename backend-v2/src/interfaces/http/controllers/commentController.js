import { CreateComment } from '../../../usecases/comment/createComment.js';
import { MongoCommentRepository } from '../../../infrastructure/mongodb/mongoCommentRepository.js';
import { GetAllComments } from '../../../usecases/comment/getAllComment.js';

const commentRepository = new MongoCommentRepository(); 
const getNestedComments = new GetAllComments({ commentRepository });


export const getAllCommentsController = async (req, res) => {
  try {
    const postId = req.params.postId;
    const nestedComments = await getNestedComments.execute(postId);
    res.status(200).json(nestedComments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createCommentController = async (req, res) => {
  try {
    const { content, parent } = req.body;
    const postId = req.params.postId;
    const userId = req.user.id;

    const useCase = new CreateComment({ commentRepository }); 
    const result = await useCase.execute({
      post: postId,
      user: userId,
      content,
      parent,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
