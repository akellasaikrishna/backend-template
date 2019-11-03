//Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost/zecode";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;
