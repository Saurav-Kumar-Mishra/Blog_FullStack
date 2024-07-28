const fileUpload = require("express-fileupload");
const nodemailer = require("nodemailer");
const file = require("../Models/fileUpload");
const user = require('../Models/user');
const cloudinary = require("cloudinary").v2;
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const { BadRequestError } = require("../Errors/error");



async function uploadToCloudinary(file, folder) {
  const options = { folder }; // Ensure the correct options object
  options.resource_type = "auto";
  try {
    const result = await cloudinary.uploader.upload(file, options);
    return result;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
}

const videoFileHandle = async (req, res) => {
  if (!req.files) {
    res.json({
      success: false,
      message: "no file Uploaded",
    });
  }
  // const { blogTextContent, imgFileLink, vidFileLink } = req.body;
  // const user=req.cookies['user'];
  // let userName=user.name;

  // if(!userName)
  //   userName="NoName";

  let Files = req.files.file;

  const videoExt = ["mp4", "mkv", "avi", "webm", "mov"];

  Files = Array.isArray(Files) ? Files : [Files];

  // checking file name length should be less than 30 character
  for (element of Files) {
    const ext = element.name.indexOf(".") + 1;
    if (element.name.length > 50) {
      return res.json({
        success: false,
        filenameExceedingLength: element.name,
        message:
          "file name length exceeded (should be less than or equal to 30)",
        extension: element.name.slice(ext),
      });
    } else if (!videoExt.includes(element.name.slice(ext))) {
      return res.json({
        success: false,
        filenameExceedingLength: element.name,
        message: "video File format not supported",
        extension: element.name.slice(ext),
      });
    }
  }

  try {
    const uploadResults = [];
    for (const element of Files) {
      const result = await uploadToCloudinary(element.tempFilePath, "Blog");
      uploadResults.push(result.secure_url);
    }
    try{
    const MongoData=file.create({
      userName:"NoName",
      blogTextContent:'hi this is the first blog content',
      imgFileLink:'nothing',
      vidFileLink:uploadResults
  })
}catch(err)
{
 return res.json({
    success: true,
    message: "could not upload Files to database",
  });
}
    res.json({
      success: true,
      message: "Files uploaded successfully",
      totalVideoFilesUploaded: Files.length,
      videoLinks: uploadResults,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


const imgFileHandle = async (req, res) => {
  if (!req.files) {
    res.json({
      success: false,
      message: "file Upload Error",
    });
    

  }
  const decodedToken = req.token;
  
  let Files = req.files.file;
  const imgExt = ["png", "jpg", "jpeg", "svg", "mov"];

  Files = Array.isArray(Files) ? Files : [Files];

  // checking file name length should be less than 30 character
  for (element of Files) {
    
    const ext = element.name.indexOf(".") + 1;
    if (element.name.length > 50) {
      return res.json({
        success: false,
        filenameExceedingLength: element.name,
        message:
          "file name length exceeded (should be less than or equal to 30)",
        extension: element.name.slice(ext),
      });
    } else if (!imgExt.includes(element.name.slice(ext))) {
      return res.json({
        success: false,
        filenameExceedingLength: element.name,
        message: "image File format not supported",
        extension: element.name.slice(ext),
      });
    }
  }

  try {
    const uploadResults = [];
    for (const element of Files) {
      const result = await uploadToCloudinary(element.tempFilePath, "Blog");
      uploadResults.push(result.secure_url);
    }
    try{
   await user.updateOne({_id:decodedToken.id},{profilePic:uploadResults[0]})
}catch(err)
{
 return res.json({
    success: true,
    message: "could not upload Files to database",
  });
}
   return res.json({
      success: true,
      message: "Files uploaded successfully",
      totalImagesUploaded: Files.length,
      imageLinks: uploadResults,
    });
  } catch (error) {
   return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
 return res.json({
    success: true,
    message: "file Uploaded successfully",
    totalVideoFilesUploaded: Files.length,
  });
};

module.exports = { videoFileHandle, imgFileHandle };
