const Card = require('../models/card');
const mongoose = require('mongoose');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then(cards => res.send({ data: cards }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  const { cardId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return res.status(404).send({ message: 'Card not found!' })
  }

  Card.findByIdAndRemove(cardId)
    .then(card => {
      if (card === null) {
        return res.status(404).send({ message: 'Card not found!' })
      }
      res.send({ data: card })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ link, name, owner})
    .then(card => res.send({ data: card }))
    .catch(err => {
      if (err.name === 'ValidationError'){
        return res.status(400).send({ message: 'Invalid data received. Try again!' })
      }
      return res.status(500).send({ message: err.message })
    });
};

module.exports.likeCard = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    return res.status(404).send({ message: 'card not found!' })
  }

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
  .then(card => {
    if (card === null) {
      return res.status(404).send({ message: 'Card not found!' })
    }
    res.send({ data: card })
  })
  .catch(err => {
    return res.status(500).send({ message: err.message })
  });
}

module.exports.dislikeCard = (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    return res.status(404).send({ message: 'card not found!' })
  }

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
  .then(card => {
    if (card === null) {
      return res.status(404).send({ message: 'Card not found!' })
    }
    res.send({ data: card })
  })
  .catch(err => {
    return res.status(500).send({ message: err.message })
  });
}