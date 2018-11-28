const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const tweetSchema = new mongoose.Schema({
  tweetMessage: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Tweet", tweetSchema);