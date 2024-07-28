const mongoose = require('mongoose');
// const { nanoid } = await import('nanoid'); // Dynamic import for ESM
// const {nanoid}= require('nanoid')

// import { nanoid } from 'nanoid';
// const id=nanoid()
const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  postId: {
    type: String,
    required: true,
    unique:true

  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Middleware to generate postId
postSchema.pre('save', async function (next) {
  console.log("eelke")
  const { nanoid } = await import('nanoid');
  console.log(this.postId)
  console.log(nanoid(10)); 
 
    this.postId = nanoid(20);
    console.log(nanoid(10)); 
    console.log(this.postId)// Generate a unique postId of length 20
  
  next();
});

module.exports = mongoose.model('post', postSchema);
