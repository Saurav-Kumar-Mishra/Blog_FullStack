const mongoose=require('mongoose');
const nodemailer=require('nodemailer');
require('dotenv').config()

const fileSchema=mongoose.Schema({

  userName:{
    type:String,
    required:true,
  },
  blogTextContent:{
    type:String,
    required:true,
  },
  imgFileLink:{
    type:[String]
  },
  vidFileLink:{
    type:[String]
  }

})
// fileSchema.post("save",async function(doc){
//   try {
//     console.log('doc',doc);
//     const transporter = nodemailer.createTransport({
//   host:process.env.MAIL_HOST,
//   port: 587,
//   secure: false, 
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
// });
// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: 'Saurav Kumar Mishra 👻', // sender address
//     to: "imsauravkrmishra@gmail.com", // list of receivers
//     subject: "File Uploaded Successfully ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);


    
//   } catch (error) {
//     console.log(error)
//   }
// })

module.exports=mongoose.model('Files',fileSchema)