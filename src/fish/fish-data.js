import { getRandomInteger, getRandomElement } from '../utils';
import { getOffersEditByType} from './list-offers.js';
import { filteringEvents } from '../utils';
import {
  DESCRIPTIONS,
  TRIPTYPES,
  TYPESLENG,
  COST,
  DESCRLENG,
  ROUTEPOINTS,
  ROUTEPOINTSLENG,
  ALLDAYS,
  ALLHOURS,
  ALLMINUTES,
  IMAGEDESCR,
  IMAGEREF,
  POINTSNUMBER
} from './const';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';


export const getDate = (date = dayjs()) => {
  const gapD = getRandomInteger(0, ALLDAYS);
  const gapH = getRandomInteger(0, ALLHOURS);
  const gapM = getRandomInteger(0, ALLMINUTES);

  return dayjs(date)
    .add(gapD, 'day')
    .add(gapH, 'hour')
    .add(gapM, 'minute')
    .toDate();
};


export const getImage = () => {
  const isPictures = Boolean(getRandomInteger(0, 1));
  if (!isPictures){
    return null;
  }
  return Array.from({length: 5}, () => ({
    src: `${IMAGEREF}${getRandomInteger(0, 100)}`,
    description: getRandomElement(IMAGEDESCR),
  }));
};


export const getRoutePoint = (id) => ({
  id: id,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRLENG)],
  name: ROUTEPOINTS[getRandomInteger(0, ROUTEPOINTSLENG)],
  pictures: getImage(),
});


export const getRoutePointModel = () => Array.from({length: ROUTEPOINTSLENG},(value, index) => getRoutePoint(index));


export const getEditForm = () => {
  const dateFrom = getDate();
  const type = getRandomElement(TRIPTYPES);

  return ({
    basePrice: getRandomInteger(COST.MINIM, COST.MAXIM),
    dateFrom,
    dateTo: getDate(dateFrom),
    destination: getRandomElement(Array.from({length: ROUTEPOINTSLENG}, (value, index) => getRoutePoint(index))).id,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: getOffersEditByType(type, 0, 6),
    type,
  });
};


function getFilter(points) {
  return Object.entries(filteringEvents).map(
    ([name, filtPoints]) => ({
      name: name,
      isPoints: filtPoints(points).length > 0,
    }),
  );
}

export {getFilter};


export const getPoint = () => {
  const type = TRIPTYPES[getRandomInteger(0, TYPESLENG - 1)];
  const dateFrom = getDate();

  return ({
    basePrice: getRandomInteger(COST.MINIM, COST.MAXIM),
    dateFrom,
    dateTo: getDate(dateFrom),
    destination: getRandomElement(Array.from({length: ROUTEPOINTSLENG}, (value, index) => getRoutePoint(index))).id,
    id: nanoid(),
    isFavourite: Boolean(getRandomInteger(0, 1)),
    offers: getOffersEditByType(getRandomInteger(0, TYPESLENG - 1), getRandomInteger(0, TYPESLENG) > TYPESLENG - 3),
    type,
  });
};


export const getPoints = () => Array.from({length: POINTSNUMBER}, getPoint);
