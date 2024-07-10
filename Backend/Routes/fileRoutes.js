
const express=require('express')
const Router=express.Router();


const {videoFileHandle,imgFileHandle}=require('../Controller/file')

Router.post("/videoFileUpload",videoFileHandle);
Router.post("/imgFileUpload",imgFileHandle);

module.exports=Router;