const post = require("../Models/Blog/post");
const { BadRequestError } = require("../Errors/error");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const user = require("../Models/user");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

async function getUser(req, res) {
  const decodeToken = req.token;
  const User = await user.findById(decodeToken.id).populate("posts");
  return res.status(200).json(User);
}

async function Post(req, res) {
  const decodedToken = req.token;

  const {postId , title, content } = req.body;
console.log(postId,title,content)
  if (!title || !content || !postId) {
    throw new BadRequestError("missing  fields");
  }

  const createPost = await post.create({
    user: decodedToken.id,
    postId,
    title,
    content,
  });

  const User = await user.findOne({ _id: decodedToken.id });

  User.posts.push(createPost._id);
  await User.save();
  res.status(200).json({
    message: "post created",
    success: true,
  });
}

async function getAllPosts(req, res) {
  // const token = req.headers.authorization.split(" ")[1];
  const decodeToken = req.token;

  const findPosts = await post.find({ user: decodeToken.id });

  res.status(200).json({
    Posts: findPosts,
    totalPost: findPosts.length,
  });
}

async function deletePost(req, res) {
  const decodeToken = req.token;
  const { title } = req.body;

  if (!title) {
    throw new BadRequestError("no title field recieved");
  }

  await post.deleteOne({ user: decodeToken.id, title: title });

  res.status(200).json({
    success: true,
    message: "post deleted",
  });
}

async function updatePost(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const { title, content, postId } = req.body;

  if (!token) {
    throw new BadRequestError("no token recieved");
  }
  const decodeToken = jwt.verify(token, process.env.SECRET);
  await post.updateOne(
    { user: decodeToken.id, postId: postId },
    { title: title, content: content }
  );
  res.status(200).json({
    success: true,
    message: "post updated",
  });
}

async function deleteAllPosts(req, res) {
  const decodedToken = req.token;

  const response = await post.deleteMany({ user: decodedToken.id });

  return res
    .status(200)
    .json({ message: "all posts deleted", deletedCount: response });
}

module.exports = {
  getUser: asyncErrorHandler(getUser),
  Post: asyncErrorHandler(Post),
  getAllPosts: asyncErrorHandler(getAllPosts),
  deletePost: asyncErrorHandler(deletePost),
  deleteAllPosts: asyncErrorHandler(deleteAllPosts),
  updatePost: asyncErrorHandler(updatePost),
};
