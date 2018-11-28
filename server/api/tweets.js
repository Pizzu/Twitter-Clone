const express = require('express');
const router = express.Router();

const tweets = require('../controllers/tweets');

router.get('/', (req, res, next) => {
  tweets.getAllTweets(req, res, next);
});

router.post('/', (req, res, next) => {
  tweets.createTweet(req, res, next);
});

router.get('/:username', (req, res, next) => {
  tweets.getUserTweets(req, res, next);
});

module.exports = router