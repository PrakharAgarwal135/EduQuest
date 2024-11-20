const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("connected to db"))
    .catch((e) => {
      console.log("error");
      console.error(e);
      process.exit(1);
    });
};
