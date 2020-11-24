const userRouter = require('express').Router();
const { getUsers, getUserById,
  createUser, updateUserProfileById,
  updateAvatarById, login} = require('../controllers/users');
  const { celebrate, Joi } = require('celebrate');


userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', celebrate({
  params:Joi.object().keys({
    id: Joi.string().alphanum(),
  })
}),getUserById);

userRouter.patch('/users/me', updateUserProfileById);

userRouter.patch('/users/me/avatar', celebrate({
  body:Joi.object().keys({
    avatar: Joi.string().required().pattern(/^(http:\/\/|https:\/\/)(w{3}\.)?([\w\-\/\(\):;,\?]+\.{1}?[\w\-\/\(\):;,\?]+)+#?$/),
  })
}),updateAvatarById);

//userRouter.post('/', createUser);

userRouter.post('/signup', celebrate({
  body:Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  })
}) ,createUser);

userRouter.post('/signin',celebrate({
  body:Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  })
}) ,login);

module.exports = userRouter;