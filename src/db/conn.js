const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DATA_BASE CONNECTED");
  })
  .catch((e) => {
    console.log("COULDN'T CONNECTED !!!");
  });
