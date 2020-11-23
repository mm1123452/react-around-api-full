const userRouter = require('express').Router();
const { getUsers, getUserById,
  createUser, updateUserProfileById,
  updateAvatarById} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateUserProfileById);
userRouter.patch('/me/avatar', updateAvatarById);
userRouter.post('/', createUser);

module.exports = userRouter;