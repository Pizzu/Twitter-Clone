const Joi = require('joi');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const signupSchema = Joi.object().keys({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).required(),
  image_url: Joi.string().uri().trim().required()
});

const loginSchema = Joi.object().keys({
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(6).required()
})

function createTokenSendResponse(user, res, next) {
  const payload = {
    _id: user._id,
    username: user.username, 
    email: user.email,
    image_url: user.image_url
  }
  jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '1d'}, (err, token) => {
    if (err) {
      res.status(422)
      const err = new Error('Something went wrong.');
      next(err);
    } else {
      res.json({user, token});
    }
  });
}

function signupUser(req, res, next) {
  const result = Joi.validate(req.body, signupSchema);
  if (result.error === null) {
    //We make sure that there are no users with that email or username
    User.findOne({$or: [
      {username: req.body.username},
      {email: req.body.email}
    ]}).exec((err, user) => {
      if (err) {
        //Something went wrong send an error message
        const err = new Error('Sorry! Something went wrong. Try again.');
        next(err);
      }
      if (user) {
        //User already exists send an error message
        res.status(409)
        const err = new Error('This email or username already exists. Please choose another one.');
        next(err);
      } else {
        //Create the user
        bcrypt.hash(req.body.password, 12, (err, hash) => {
          if (err) {
            const err = new Error('Sorry! Something went wrong. Try again.');
            next(err);
          } else {
            const newUser = {username: req.body.username, email: req.body.email, image_url: req.body.image_url, hash};
            User.create(newUser, (err, returnedUser) => {
              if (err) {
                const err = new Error('Sorry! Something went wrong. Try again.');
                next(err);
              } else {
                let userCreated = {
                  _id: returnedUser._id ,
                  username: returnedUser.username, 
                  email: returnedUser.email,
                  image_url: returnedUser.image_url
                };
                createTokenSendResponse(userCreated, res, next);
              }
            }); 
          }
        });
      }
    });
  } else {
    res.status(400);
    next(result.error);
  }
}

function loginUser(req, res, next) {
  const result = Joi.validate(req.body, loginSchema);
  if (result.error === null) {
    User.findOne(
      {email: req.body.email}
    ).exec((err, user) => {
      if (err) {
        const err = new Error('Sorry! Something went wrong. Try again.');
        next(err);
      }
      if (user) {
        //check if the passwords match
        bcrypt.compare(req.body.password, user.hash)
          .then(result => {
            if (result) {
              //Correct password
              let recivedUser = {
                _id: user._id ,
                username: user.username, 
                email: user.email,
                image_url: user.image_url
              };
              createTokenSendResponse(recivedUser, res, next);
            } else {
              //Wrong password
              res.status(422);
              const err = new Error('The Email or Password you entered is incorrect.');
              next(err);
            }
          })
      } else {
        res.status(422);
        const err = new Error('The Email or Password you entered is incorrect.');
        next(err);
      }
    }) 
  } else {
    res.status(400);
    next(result.error);
  }
}

module.exports = {
  signupUser,
  loginUser
}