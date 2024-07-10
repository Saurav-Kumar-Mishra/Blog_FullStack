const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.DATABASE_URL;

const dbConnect = () => {
  mongoose
    .connect(port)
    .then(() => console.log("DB connected successfully!"))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
};



module.exports = dbConnect;
