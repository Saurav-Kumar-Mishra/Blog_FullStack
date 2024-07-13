
const express=require('express')
const Router=express.Router();
const {auth,isReader,isAdmin,isBlogger}=require('../Middlewares/AuthMiddleware.js')

const {login,signUp,logout,verifyUser}=require('../Controller/Auth.js');
// const { verify } = require('jsonwebtoken');

Router.post("/signup",signUp);
Router.post("/login",login);
Router.get("/logout",logout);
// Router.get('/verifySession',verifySession);
Router.get('/verifyUser/:token',verifyUser);

// protected routes

Router.get("/Admin",auth , isAdmin,(req,res)=>{
  res.json({
    message:"welcome to admin route"
  })
}) 
Router.get("/Blogger",auth , isBlogger,(req,res)=>{
  // res.redirect('/home')
  res.json({
    message:"welcome to blogger route"
  })
}) 
Router.get("/Reader",auth , isReader,(req,res)=>{
  res.json({
    message:"welcome to reader route"
  })
}) 
Router.get("/dashboard",auth , isBlogger,(req,res)=>{
  res.json({
    message:"welcome to dashboard"
  })
}) 


module.exports=Router;