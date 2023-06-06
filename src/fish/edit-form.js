import { getRandomNumber, getRandomElement } from '../utils.js';
import { getDate } from './date.js';
import { generateOffersByType} from './list-offers.js';
import { getDestination } from './destination.js';
import { TYPES, DESTINATIONS, Prices, NumberServices } from './const.js';

export const getForm = () => {
  const dateFrom = getDate();
  const type = getRandomElement(TYPES);
  const destinations = Array.from({length: DESTINATIONS.length}, (value, index) => getDestination(index));

  return ({
    'basePrice': getRandomNumber(Prices.MIN, Prices.MAX),
    dateFrom,
    'dateTo': getDate(dateFrom),
    'destination': getRandomElement(destinations).id,
    'isFavorite': Boolean(getRandomNumber(0,1)),
    'offers': generateOffersByType(type, NumberServices.MIN, NumberServices.MAX),
    type,
  });
};
