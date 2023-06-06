import { getRandomNumber, getRandomElement } from '../utils.js';
import { generateOffersByType } from './list-offers.js';
import { TYPES, Prices, DESTINATIONS} from './const.js';
import { getDate } from './date.js';
import { getDestination } from './destination';

export const getPoint = () => {
  const type = getRandomElement(TYPES);
  const dateFrom = getDate();
  const destinations = Array.from({length: DESTINATIONS.length}, (value, index) => getDestination(index));

  return ({
    'basePrice': getRandomNumber(Prices.MIN, Prices.MAX),
    dateFrom,
    'dateTo': getDate(dateFrom),
    'destination': getRandomElement(destinations).id,
    'id': getRandomNumber(1,100),
    'isFavourite': Boolean(getRandomNumber(0,1)),
    'offers': generateOffersByType(type),
    type,
  });
};
