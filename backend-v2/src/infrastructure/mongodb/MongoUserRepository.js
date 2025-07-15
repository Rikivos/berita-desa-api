import { UserRepository } from "../../domain/user/UserRepository.js";
import { model, Schema, mongoose } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["admin", "user", "writer"],
      default: "user",
    },
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema);

export class MongoUserRepository extends UserRepository {
  async create(user) {
    const hashed = await bcrypt.hash(user.password, 10);
    const created = await UserModel.create({ ...user, password: hashed });
    return created;
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async findById(id) {
    return await UserModel.findById(id);
  }

  async update(id, user) {
    return await UserModel.findByIdAndUpdate(id, user, { new: true });
  }

  async findAll(page = 1, limit = 10) {
  const offset = (page - 1) * limit;
  return await UserModel.find({})
    .select('name email role') 
    .skip(offset)
    .limit(limit)
    .lean(); 
}


  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await UserModel.findByIdAndDelete(id);
  }
}
