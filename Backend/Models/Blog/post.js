const mongoose=require('mongoose')

const postSchema=mongoose.Schema({
  user:{
    type:mongoose.Types.ObjectId,
    ref:'user',
    required:true
  },
  postId:{
    type:Number,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true,
  },
},{timestamps:true})

module.exports = mongoose.model("post",postSchema);