import { CommentRepository } from "../../domain/comment/commentRepository.js";
import { model, Schema, Types, mongoose } from "mongoose";

const CommentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1000
    },

    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },

}, { timestamps: true });

const CommentModel = model('Comment', CommentSchema);

export class MongoCommentRepository extends CommentRepository {
    async create(comment) {
        const newComment = await CommentModel.create(comment);
        return newComment;
    }

    async getAllComments(postId) {
        const comments = await CommentModel.find({ post: postId }).populate('user').populate('parent');
        return comments;
    }

    async findById(commentId) {
        const comment = await CommentModel.findById(commentId);
        return comment;
    }

    async update(commentId, comment) {
        const updatedComment = await CommentModel.findByIdAndUpdate(commentId, comment, { new: true });
        return updatedComment;
    }

    async deleteById(commentId) {
        const deletedComment = await CommentModel.findByIdAndDelete(commentId);
        return deletedComment;
    }

}
