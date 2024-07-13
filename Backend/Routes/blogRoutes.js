const express = require("express");
const {Post,getAllPosts, deletePost, updatePost}=require('../Controller/blog')
const blogRouter = express.Router();


blogRouter.get("/getAllPosts/", getAllPosts);
blogRouter.post("/createPost/", Post);
blogRouter.delete('/deletePost', deletePost)
blogRouter.put('/updatePost', updatePost)


module.exports = blogRouter;
