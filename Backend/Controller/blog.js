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

  const { title, content } = req.body;
  console.log(title, content);
  const postId=5;
  if (!title || !content) {
    throw new BadRequestError("Missing fields");
  }


    // Create the post
    const createPost = await post.create({
      user: decodedToken.id,
      title,
      postId,
      content,
    });

    console.log("Post created successfully", createPost);

    // Add the post to the user's posts array
    const User = await user.findById(decodedToken.id);
    User.posts.push(createPost._id);
    await User.save();

    console.log("Post added to user's posts and user saved");

    res.status(200).json({
      message: "Post created",
      success: true,
      post: createPost,
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
async function fetchAllPosts(req, res) {
  // const token = req.headers.authorization.split(" ")[1];

  const findPosts = await post.find().populate("user");

  res.status(200).json({
    Posts: findPosts,
    totalPost: findPosts.length,
  });
}

async function deletePost(req, res) {
  const decodeToken = req.token;
  const { postId } = req.body;
  if (!postId) {
    throw new BadRequestError("no title field recieved");
  }
  const postExist = await post.findOne({ user: decodeToken.id, postId:postId });
  console.log(postExist);
  if (!postExist) throw new BadRequestError("no post to delete");

  console.log("kkk", postExist._id);

  await user.updateOne(
    { _id: decodeToken.id },
    { $pull: { posts: postExist._id } }
  );
  const deletedPost = await post.deleteOne({
    user: decodeToken.id,
    postId:postId
  });
  console.log(deletedPost);
  console.log("post deleted");
  res.status(200).json({
    success: true,
    message: "post deleted",
    postId
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
  fetchAllPosts: asyncErrorHandler(fetchAllPosts),
};
