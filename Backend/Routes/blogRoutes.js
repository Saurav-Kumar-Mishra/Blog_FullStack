const express = require("express");
const {Post,getAllPosts, deletePost, updatePost, getUser, deleteAllPosts, fetchAllPosts}=require('../Controller/blog')
const tokenAuth = require('../Middlewares/decodeTokenMiddleware')
const blogRouter = express.Router();


blogRouter.get("/getuser",tokenAuth, getUser); 
blogRouter.get("/getAllPosts/",tokenAuth, getAllPosts);
blogRouter.post("/createPost/",tokenAuth, Post);
blogRouter.delete('/deletePost',tokenAuth, deletePost)
blogRouter.delete('/deleteAllPosts',tokenAuth, deleteAllPosts)
blogRouter.put('/updatePost', updatePost)
blogRouter.get('/fetchallposts', fetchAllPosts)


module.exports = blogRouter;
