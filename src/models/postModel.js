import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming there's a User model
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Draft",
      enum: ["Draft", "Published"],
    },
    isFeatured: {
      type: Boolean,
      required: true,
      default: false,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    comments: {
      type: [Object],
    },
    views: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = models?.Post || mongoose.model("Post", postSchema);
module.exports = Post;
