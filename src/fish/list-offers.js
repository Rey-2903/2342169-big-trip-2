import { getRandomNumber, getRandomElement } from '../utils.js';
import { OFFERS, Prices, NumberServices, TYPES } from './const.js';

const getOffer = (id) => ({
  'id': id,
  'title': getRandomElement(OFFERS),
  'price': getRandomNumber(Prices.MIN, Prices.MAX),
});


const generateOffersByType = (typeId, min = NumberServices.MIN, max = NumberServices.MAX) => ({
  'type': TYPES[typeId],
  'offers': Array.from({length: getRandomNumber(min, max)}, (value, id) => getOffer(id)),
});

const generateOffersByAllTypes = () => Array.from({length: TYPES.length}, (value, id) => generateOffersByType(id));

const getOffersByType = (type) => generateOffersByAllTypes().find((item) => item.type === type).offers;

export {generateOffersByType, getOffersByType};
