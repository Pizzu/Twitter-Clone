import Joi from 'joi';

const signupSchema = Joi.object().keys({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(),
  email: Joi.string().email().trim().required().error(new Error('Make sure to insert a valid email address.')),
  password: Joi.string().min(6).required().error(new Error('Password length must be at least 6 characters long.')),
  image_url: Joi.string().uri().trim().required()
});

const loginSchema = Joi.object().keys({
  email: Joi.string().email().trim().required().error(new Error('Make sure to insert a valid email address.')),
  password: Joi.string().min(6).required().error(new Error('Password length must be at least 6 characters long.')),
});

const tweetSchema = Joi.object().keys({
  tweetMessage: Joi.string().trim().required()
})

export function validateSignupUser(user) {
  const result = Joi.validate(user, signupSchema);
  if (result.error) {
    return result.error.message;
  } else {
    return null;
  }
}

export function validateLoginUser(user) {
  const result = Joi.validate(user, loginSchema);
  if (result.error) {
    return result.error.message;
  } else {
    return null;
  }
}

export function validateTweetSchema(tweet) {
  const result = Joi.validate(tweet, tweetSchema);
  if (result.error) {
    return result.error.message;
  } else {
    return null;
  }
}

