import { getRandomInteger, getRandomElement } from '../utils';
import dayjs from 'dayjs';
import {
  DESCRIPTIONS,
  ROUTE_POINTS,
  TRIP_TYPES,
  COST,
  IMAGE_DESCR,
  IMAGE_REF,
  ALL_DAYS,
  ALL_HOURS,
  ALL_MINUTES,
  DESCR_LENG,
  ROUTE_POINTS_LENG,
} from './const.js';
import { getOffersEditByType } from './list-offers.js';
import { nanoid } from 'nanoid';
import { allOffersPoint } from './list-offers.js';

export const getDate = (date = dayjs()) => dayjs(date)
  .add(getRandomInteger(0, ALL_DAYS), 'day')
  .add(getRandomInteger(0, ALL_HOURS), 'hour')
  .add(getRandomInteger(0, ALL_MINUTES), 'minute')
  .toDate();


export const getImage = () => {
  const isPictures = Boolean(getRandomInteger(0,1));
  if (!isPictures) { return null; }
  return Array.from({length: 5}, () => ({
    src: `${IMAGE_REF}${getRandomInteger(0, 100)}`,
    description: getRandomElement(IMAGE_DESCR),
  }));
};


const getRoutePoint = (id) => ({
  id: id,
  description: DESCRIPTIONS[getRandomInteger(0, DESCR_LENG)],
  name: ROUTE_POINTS[getRandomInteger(0, ROUTE_POINTS_LENG)],
  pictures: getImage(),
});


export const getRoutePointModel = Array.from({length: ROUTE_POINTS.length}, (value, index) => getRoutePoint(index));


export const getEditForm = () => {
  const dateFrom = getDate();
  const type = getRandomElement(TRIP_TYPES);

  return ({
    basePrice: getRandomInteger(COST.MINIM,COST.MAXIM),
    dateFrom,
    dateTo: getDate(dateFrom),
    destination: getRandomElement(Array.from({length: ROUTE_POINTS_LENG}, (value, index) => getRoutePoint(index))).id,
    isFavorite: Boolean(getRandomInteger(0,1)),
    offers: getOffersEditByType (type, 0, 6),
    type,
  });
};


export const getPoint = () => {
  const dateFrom = getDate();
  const allPossibleOffers = getRandomElement(allOffersPoint).offers.length;

  return ({
    basePrice: getRandomInteger(COST.MINIM, COST.MAXIM),
    dateFrom,
    dateTo: getDate(dateFrom),
    destination: getRandomElement(getRoutePointModel).id,
    id: nanoid(),
    isFavourite: Boolean(getRandomInteger(0,1)),
    offers: getRandomElement(allOffersPoint).offers.map((offer) => offer.id).slice(0, allPossibleOffers > 2 ? getRandomInteger(2, allPossibleOffers) : allPossibleOffers),
    type: getRandomElement(allOffersPoint).type,
  });
};
