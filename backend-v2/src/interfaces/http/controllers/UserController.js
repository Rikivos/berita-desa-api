import { MongoUserRepository } from '../../../infrastructure/mongodb/MongoUserRepository.js';
import { CreateUser } from '../../../usecases/user/CreateUser.js';
import { LoginUser } from '../../../usecases/user/LoginUser.js';
import { RegisterUser } from '../../../usecases/user/registerUser.js';
import { GetAllUser } from '../../../usecases/user/getAllUser.js';
import { UpdateUser } from '../../../usecases/user/updateUser.js';
import { DeleteUser } from '../../../usecases/user/deleteUser.js';

const userRepo = new MongoUserRepository();
const createUser = CreateUser(userRepo);
const loginUser = LoginUser(userRepo);
const getAllUser = new GetAllUser(userRepo);
const updateUserUseCase = new UpdateUser(userRepo);


export const createUserHandler = async (req, res) => {
  try {
    const result = await createUser(req.body);
    res.status(201).json({ success: true, user: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const loginUserHandler = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const registerUser = RegisterUser(userRepo);
    const result = await registerUser({ name, email, password });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllUserController = async (req, res) => {
  try {
    const getAllUser = new GetAllUser(userRepo);
    const result = await getAllUser.execute();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserController = async (req, res) => {
  const { id } = req.params;          
  const updateData = req.body;
  const currentUser = req.user;        // dari auth middleware (decoded token)

  try {
    const updatedUser = await updateUserUseCase.execute(currentUser, id, updateData);
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

export const deleteUserController = (req, res, next) => {
  const handler = new DeleteUser(userRepo);
  handler.handle(req, res, next);
}