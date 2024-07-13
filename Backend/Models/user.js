const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
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
  isVerified:{
    type:Boolean,
    required:true,
    default:false,
  },
},{timestamps:true})

userSchema.pre("save",async function() {
 this.password=  bcrypt.hash(this.password,10);
  })
 

module.exports=mongoose.model("user",userSchema);


