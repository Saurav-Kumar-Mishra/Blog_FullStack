const post = require("../Models/Blog/post");
const { BadRequestError } = require("../Errors/error");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const asyncErrorHandler = require("../utils/asyncErrorHandler");

async function Post(req, res) {
  // const token = req.params;

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    throw new BadRequestError("no token recieved");
  }
  const { title, content,postId } = req.body;

  if(!title || !content || !postId)
  {
    throw new BadRequestError("missing postId field");
  }
  const decodeToken = jwt.verify(token, process.env.SECRET);

  const createPost = await post.create({
    user: decodeToken.id,
    postId,
    title,
    content,
  });

  res.status(200).json({
    message: "post created",
    success: true,
  });
}

async function getAllPosts(req, res) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    throw new BadRequestError("no token recieved");
  }

  const decodeToken = jwt.verify(token, process.env.SECRET);

  const findPosts = await post.find({ user: decodeToken.id });
  // console.log(findPosts)

  res.status(200).json({
    success: true,
    Posts: findPosts,
  });
}

async function deletePost(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  
  if (!token) {
    throw new BadRequestError("no token recieved");
  }
  const { title } = req.body;

  if(!title)
  {
    throw new BadRequestError("no title field recieved")
  }

  const decodeToken = jwt.verify(token, process.env.SECRET);
  await post.deleteOne({user:decodeToken.id,title:title})

  
  res.status(200).json({
    success: true,
    message:'post deleted'
  });

}

async function updatePost(req,res)
{
  const token = req.headers.authorization.split(" ")[1];
  const { title,content,postId } = req.body;

  if (!token) {
    throw new BadRequestError("no token recieved");
  }
  const decodeToken = jwt.verify(token, process.env.SECRET);
  await post.updateOne({user:decodeToken.id,postId:postId},{title:title ,content:content})
  res.status(200).json({
    success: true,
    message:'post updated'
  });

}

module.exports = {
  Post: asyncErrorHandler(Post),
  getAllPosts: asyncErrorHandler(getAllPosts),
  deletePost:asyncErrorHandler(deletePost),
  updatePost:asyncErrorHandler(updatePost),
};
