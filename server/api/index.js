const express = require('express');
const router = express.Router();

const tweets = require('./tweets.js');
const middlewares = require('../middlewares');

router.get('/', (req, res) => {
  res.json({user: req.user});
});

router.use('/tweets', middlewares.isLoggedIn , tweets);

module.exports = router