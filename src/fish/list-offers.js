import { getRandomInteger } from '../utils';
import { COST, TRIPTYPES, TYPESLENG, OFFERS, OFFERSLENG } from './const.js';

const getOffers = (id) => ({
  id: id,
  title: OFFERS[getRandomInteger(0, OFFERSLENG - 1)],
  price: getRandomInteger(COST.MINIM, COST.MAXIM),
});

const getOffersEditByType = (type) => {
  const leng = getRandomInteger(0, 6);
  return {
    type: TRIPTYPES[type],
    offers: (getRandomInteger(0, TYPESLENG) > TYPESLENG - 3)
      ? []
      : Array.from({length: leng}, (value, id) => getOffers(id, TRIPTYPES[type])),
  };
};

const getOffersByAllTypes = () => Array.from({length: TYPESLENG}, (value, id) => getOffersEditByType(id));

export { getOffersEditByType, getOffersByAllTypes };
