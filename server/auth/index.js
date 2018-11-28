const express = require('express');
const router = express.Router();

const login = require('./login');
const signup = require('./signup');

router.get('/', (req, res) => {
  res.json({message: '🔐'});
});

router.use('/signup', signup);
router.use('/login', login);

module.exports = router;