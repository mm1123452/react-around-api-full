const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default:'Jacques Cousteau'
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default:'Explorer'
  },
  avatar: {
    type: String,
    validate: {
      validator: function(v) {
        return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/.test(v);
      },
      message: props => `${props} Please enter a valid link`
    },
    default:'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg'
  },
  email: {
    required: true,
    unique: true,
    type: String,
    validate: {
      validator: function(v) {
        return  validator.isEmail(v)
      },
      message: props => `${props} Please enter a valid email`
    }
  },
  password: {
    required: true,
    type: String,
    select: false
  }
});


userSchema.statics.findUserByCredentials = function (email, password) {
  // trying to find the user by email
  return this.findOne({ email }).select('+password')
    .then((user) => {
      // not found - rejecting the promsie
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      // found - comparing hashes
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) // rejecting the promise
      
      return user; // oh - the user variable is not in this scope
    });
};

module.exports = mongoose.model('user', userSchema);