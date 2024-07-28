const {AppError} = require('../Errors/error')
const ErrorMiddleware=(error,req,res,next)=>
{ 
  console.log("error middleware");
  if(error instanceof AppError)
  {
  console.log("instace of ",error.message);
    return res.json({
      message:error.message,
      statusCode:error.statusCode,
      success:error.success
    })
  }
  else{
    return res.status(500).json({
      message:"Internal Server Error",
      error:error.message,
      success:false
    })
  }
}
module.exports=ErrorMiddleware;