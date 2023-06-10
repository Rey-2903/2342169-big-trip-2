import { getRandomInteger, getRandomElement } from '../utils.js';
import { OFFERS, Prices, NumberServices, TYPES } from './const.js';

const leng = TYPES.length;

const getOffer = (id) => ({
  'id': id,
  'title': getRandomElement(OFFERS),
  'price': getRandomInteger(Prices.MIN, Prices.MAX),
});


const generateOffersByType = (typeId, min = NumberServices.MIN, max = NumberServices.MAX) => ({
  'type': TYPES[typeId],
  'offers': Array.from({length: getRandomInteger(min, max)}, (value, id) => getOffer(id)),
});

const getOffersByType = (type) => Array.from({length: leng}, (value, id) => generateOffersByType(id)).find((item) => item.type === type).offers;

export {generateOffersByType, getOffersByType};
