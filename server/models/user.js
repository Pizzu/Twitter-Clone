const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  hash: {type: String, required: true},
  image_url: {type: String, required: true}
});

module.exports = mongoose.model("User", userSchema);