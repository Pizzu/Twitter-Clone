const Tweet = require('../models/tweet');
const User = require('../models/user');
const Joi = require('joi');

const tweetSchema = Joi.object().keys({
  tweetMessage: Joi.string().trim().required()
})

function getAllTweets(req, res, next) {
  Tweet
    .find({})
    .populate('author')
    .exec((err, tweets) => {
      if (err) {
        const err = new Error('Sorry! Something went wrong. Try again.');
        next(err);
      }
      res.json(tweets);
    });
}

function createTweet(req, res, next) {
  const result = Joi.validate(req.body, tweetSchema);
  if (result.error === null) {
    Tweet
      .create({...req.body, author: req.user._id}, (err, createdTweet) => {
        if (err) {
          const err = new Error('Sorry! Something went wrong. Try again.');
          next(err);
        }
        Tweet
          .findOne({_id: createdTweet._id})
          .populate('author')
          .exec((err, retrivedTweet) => {
            if (err) {
              const err = new Error('Sorry! Something went wrong. Try again.');
              next(err);
            }
            res.json(retrivedTweet);
        })
    })
  } else {
    res.status(422);
    next(result.error);
  }
}

function getUserTweets(req, res, next) {
  User
    .findOne({username: req.params.username})
    .exec((err, user) => {
      if (err) {
        const err = new Error('Sorry! Something went wrong. Try again.');
        next(err);
      }
      if (user) {
        //We get all the user tweets
        Tweet
          .find({author: user._id})
          .populate('author')
          .exec((err, userTweets) => {
            if (err) {
              const err = new Error('Sorry! Something went wrong. Try again.');
              next(err);
            }
            res.json({userTweets: userTweets, user: user});
          });
      } else {
        res.status(400);
        const err = new Error('No username.');
        next(err);
      }
    })
}

module.exports = {
  getAllTweets,
  createTweet,
  getUserTweets
}