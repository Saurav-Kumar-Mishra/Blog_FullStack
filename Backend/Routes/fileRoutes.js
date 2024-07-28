
const express=require('express')
const Router=express.Router();
const tokenAuth = require('../Middlewares/decodeTokenMiddleware')


const {videoFileHandle,imgFileHandle}=require('../Controller/file')

Router.post("/videoFileUpload",tokenAuth,videoFileHandle);
Router.post("/imgFileUpload",tokenAuth,imgFileHandle);

module.exports=Router;