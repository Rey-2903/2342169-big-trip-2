const POINTS_NUMBER = 10;
const TRIP_TYPES = ['taxi', 'bus', 'train', 'ship','drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const TRIP_TYPES_LENG = TRIP_TYPES.length;
const ROUTE_POINTS = ['Crimea', 'Paris', 'Peter', 'Sochi', 'Moscow', 'Istanbul', 'Tokyo', 'Rome', 'Dubai'];
const ROUTE_POINTS_LENG = ROUTE_POINTS.length;

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.'
];
const DESCR_LENG = DESCRIPTIONS.length;

const OFFERS = [
  'Add a child safety seat',
  'Stay overnight',
  'Add lunch',
  'Rent a polaroid',
  'Add a place for a pet',
  'Book a window seat',
  'Book a place in the recreation area',
  'Use the translator service',
  'Upgrade to a business class',
  'Change to Business Class',
  'Add breakfast',
  'Add dinner',
  'Carsharing',
  'Reserve tickets',
];
const OFFERS_LENG = OFFERS.length;

const IMAGE_DESCR = ['Pleasant place', 'Beautiful views', 'Live picture', 'Vintage city'];
const IMAGE_REF = 'http://picsum.photos/248/152?r=';
const COST = {MINIM: 150, MAXIM: 2500};
const ALL_DAYS = 7;
const ALL_HOURS = 24;
const ALL_MINUTES = 60;

const MODES_TYPES = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const FILTERS = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const SORT = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const ACTIONS_POINTS = {
  UPDATE: 'UPDATE_POINT',
  ADD: 'ADD_POINT',
  DELETE: 'DELETE_POINT',
};

const UPDATE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const ERROR_UPDATE = 'You cannot update a non-existent point';
const ERROR_DELETE = 'You cannot delete a non-existent point';


export {
  POINTS_NUMBER,
  TRIP_TYPES,
  TRIP_TYPES_LENG,
  ROUTE_POINTS,
  ROUTE_POINTS_LENG,
  DESCRIPTIONS,
  DESCR_LENG,
  OFFERS,
  OFFERS_LENG,
  IMAGE_DESCR,
  IMAGE_REF,
  COST,
  ALL_DAYS,
  ALL_HOURS,
  ALL_MINUTES,
  MODES_TYPES,
  SORT,
  FILTERS,
  ACTIONS_POINTS,
  UPDATE,
  ERROR_UPDATE,
  ERROR_DELETE,
};
