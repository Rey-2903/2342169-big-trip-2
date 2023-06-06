import { getRandomInteger, getRandomElement } from '../util.js';
import dayjs from 'dayjs';

const NUMBER_POINT = 30;

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const NAMES = ['Amsterdam', 'Chamonix', 'Geneva', 'London', 'Paris'];
const DESCRIPTIONS = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const generateDescription = () => {
  let description = '';
  for (let i = 0; i < getRandomInteger(1, 4); i++) {
    description += ` ${getRandomElement(DESCRIPTIONS)}`;
  }
  return description;
};
const generatePicture = () => ({
  src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 10)}`,
  description: generateDescription(),
});
const generateDestination = (id) => ({
  id,
  description: generateDescription(),
  name: NAMES[id],
  pictures: Array.from({length: getRandomInteger(1, 4)}, generatePicture),
});

const getDestinations = () => Array.from({length: NAMES.length}).map((value, index) => generateDestination(index));

const generateOffer = (id, pointType) => ({
  id,
  title: `offer for ${pointType}`,
  price: getRandomInteger(150, 4000)
});
const generateOffersByType = (pointType) => ({
  type: pointType,
  offers: Array.from({length: getRandomInteger(1, 4)}).map((value, index) => generateOffer(index + 1, pointType)),
});

const getOffersByType = () => Array.from({length: TYPES.length}).map((value, index) => generateOffersByType(TYPES[index]));

const offersByType = getOffersByType();
const destinations = getDestinations();

const generatePoint = (id) => {
  const offersByTypePoint = getRandomElement(offersByType);
  const allOfferIdsByTypePoint = offersByTypePoint.offers.map((offer) => offer.id);
  return {
    basePrice: getRandomInteger(150, 4000),
    dateFrom: dayjs().add(getRandomInteger(-3, 0), 'day').add(getRandomInteger(-2, 0), 'hour').add(getRandomInteger(-59, 0), 'minute'),
    dateTo: dayjs().add(getRandomInteger(0, 2), 'hour').add(getRandomInteger(0, 59), 'minute'),
    destinationId: getRandomElement(destinations).id,
    id,
    isFavorite: Boolean(getRandomInteger()),
    offerIds: Array.from({length: getRandomInteger(0, allOfferIdsByTypePoint.length)}).map(() => allOfferIdsByTypePoint[getRandomInteger(0, allOfferIdsByTypePoint.length - 1)]),
    type: offersByTypePoint.type,
  };
};

const getPoints = () => Array.from({length: NUMBER_POINT}).map((value, index) => generatePoint (index + 1));

export {getPoints, getDestinations, getOffersByType };

