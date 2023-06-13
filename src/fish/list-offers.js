import { getRandomInteger } from '../utils';
import { COST, TRIPTYPES, TYPESLENG, OFFERS, OFFERSLENG } from './const.js';

const getOffers = (id) => ({
  id: id,
  title: OFFERS[getRandomInteger(0, OFFERSLENG - 1)],
  price: getRandomInteger(COST.MINIM, COST.MAXIM),
});

const getOffersEditByType = (type, isEmpty) => ({
  type: TRIPTYPES[type],
  offers: isEmpty === false
    ? []
    : Array.from({length: getRandomInteger(0, 6)}, (value, id) => getOffers(id, TRIPTYPES[type])),
});

const getOffersByAllTypes = () => Array.from({length: TYPESLENG}, (value, id) => getOffersEditByType(id));

export { getOffersEditByType, getOffersByAllTypes };
