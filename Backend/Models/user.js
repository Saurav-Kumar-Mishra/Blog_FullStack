const mongoose=require('mongoose')

const userSchema=mongoose.Schema({

  name:{
    type:String,
    required:true,
    trim:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    trim:true
  },
  password:{
    type:String,
    required:true
  },
  country:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  role:{
    type:String,
    enum:["Admin","Blogger","Reader"]
  },
})
 

module.exports=mongoose.model("user",userSchema);