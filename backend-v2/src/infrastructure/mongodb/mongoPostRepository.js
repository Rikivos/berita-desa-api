import { PostRepository } from "../../domain/post/postRepository.js";
import { model, Schema, Types, mongoose } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    image: String,
    content: { type: Schema.Types.Mixed },
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const PostModel = model("Post", PostSchema);

export class MongoPostRepository extends PostRepository {
  async create(post) {
    const newPost = await PostModel.create(post);
    return {
      id: newPost._id,
      title: newPost.title,
      slug: newPost.slug,
      image: newPost.image,
      content: newPost.content,
      status: newPost.status,
      user: newPost.user,
      category: newPost.category,
    };
  }

  async getAll() {
    const posts = await PostModel.find();
    return posts.map((post) => ({
      id: post._id,
      title: post.title,
      slug: post.slug,
      image: post.image,
      content: post.content,
      status: post.status,
      user: post.user,
      category: post.category,
    }));
  }

  async getById(id) {
    const post = await PostModel.findById(id);
    if (!post) return null;
    return {
      id: post._id,
      title: post.title,
      slug: post.slug,
      image: post.image,
      content: post.content,
      status: post.status,
      user: post.user,
      category: post.category,
    };
  }

  async findById(postId) {
    const post = await PostModel.findById(postId);
    if (!post) return null;
    return {
      id: post._id,
      title: post.title,
      slug: post.slug,
      image: post.image,
      content: post.content,
      status: post.status,
      user: post.user,
      category: post.category,
    };
  }

  async update(id, post) {
    const updatedPost = await PostModel.findByIdAndUpdate(id, post, {
      new: true,
    });
    return {
      id: updatedPost._id,
      title: updatedPost.title,
      slug: updatedPost.slug,
      image: updatedPost.image,
      content: updatedPost.content,
      status: updatedPost.status,
      user: updatedPost.user,
      category: updatedPost.category,
    };
  }

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    const deletedPost = await PostModel.findByIdAndDelete(id);
    if (!deletedPost) return null;

    return {
      id: deletedPost._id,
      title: deletedPost.title,
      slug: deletedPost.slug,
      image: deletedPost.image,
      content: deletedPost.content,
      status: deletedPost.status,
      user: deletedPost.user,
      category: deletedPost.category,
    };
  }

  async countByCategoryId(categoryId) {
    return await PostModel.countDocuments({ category: categoryId });
  }
  
}
