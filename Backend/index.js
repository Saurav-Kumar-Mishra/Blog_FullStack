const express = require("express");
// require('express-async-errors');    // uncomment this if u r not using error asyncErrorHnadler present inside util folder
require("dotenv").config(); 
const dbConnect = require("./Config/database.js");
const PORT = process.env.PORT || 4000;
const router = require("./Routes/AuthRoutes.js");
const fileRoute=require("./Routes/fileRoutes.js")
const cors = require("cors");
const bodyParser = require("body-parser");
const App = express();
const fileUpload=require('express-fileupload');
const cloudinaryConnect=require('./Config/cloudinaryDB.js');
const cookieParser=require('cookie-parser');
const ErrorMiddleware =require('./Middlewares/ErrorMiddleware.js')

App.use(cors());
App.use(fileUpload({
  useTempFiles: true,
  tempFileDir:'/tmp/',
}));
App.use(express.json());
App.use(cookieParser());

App.listen(PORT, () => {
  console.log("server is connected to port : ", PORT);
});


App.use("/api/v1", router); 
App.use("/api/v1", fileRoute);
App.use(ErrorMiddleware);

App.get("/", (req, res) => {
  res.send("<h1>Home Page </h1>");
});
dbConnect();
cloudinaryConnect();
