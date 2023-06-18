import { getRandomInteger } from '../utils';
import {
  COST,
  TRIP_TYPES,
  TRIP_TYPES_LENG,
  OFFERS,
  OFFERS_LENG
} from './const.js';

const getOffers = (id) => ({
  id: id,
  title: OFFERS[getRandomInteger(0, OFFERS_LENG - 1)],
  price: getRandomInteger(COST.MINIM, COST.MAXIM),
});

const getOffersEditByType = (type) => {
  const leng = getRandomInteger(0, 6);
  return {
    type: TRIP_TYPES[type],
    offers: getRandomInteger(0, TRIP_TYPES_LENG) > TRIP_TYPES_LENG - 3
      ? []
      : Array.from({length: leng}, (value, id) => getOffers(id, TRIP_TYPES[type])),
  };
};

const getOffersByAllTypes = () => Array.from({length: TRIP_TYPES_LENG}, (value, id) => getOffersEditByType(id));

const allOffersPoint = getOffersByAllTypes();

export { allOffersPoint, getOffersEditByType };
