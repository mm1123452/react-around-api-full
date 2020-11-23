const cardsRouter = require('express').Router();
const { getCards, deleteCard, createCard,
  likeCard,dislikeCard } = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);
cardsRouter.post('/', createCard);

module.exports = cardsRouter;