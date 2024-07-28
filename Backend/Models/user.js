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
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'post',
    required: true
  }],
  role:{
    type:String,
    enum:["Admin","Blogger","Reader"]
  },
  profilePic:{
    type:String
  },
  isVerified:{
    type:Boolean,
    required:true,
    default:false,
  },
},{timestamps:true})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
 

module.exports=mongoose.model("user",userSchema);


